const NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const path = require('path');

const createRenderer = (manifest) => (req, res, next) => {
  res.render('index', {
    assets: manifest,
  });
};

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-unresolved */
if (NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
  app.use((req, res, next) => {
    const manifest = JSON.parse(compiler.outputFileSystem.readFileSync(path.join(__dirname, 'dist', 'manifest.json'), 'utf8'));
    createRenderer(manifest)(req, res, next);
  });
} else {
  const manifest = require('./dist/manifest.json');
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(createRenderer(manifest));
}
/* eslint-enable import/no-extraneous-dependencies, global-require */

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.end();
});

app.listen(3000);
