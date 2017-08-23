const NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const path = require('path');

const createRenderer = (render, manifest) => (req, res, next) => {
  render(req)
    .then(({ context, content, state }) => {
      if (context.url) {
        res.redirect(context.status || 301, context.url);
        return;
      }
      if (context.status) {
        res.status(context.status);
      }
      if (context.disableLayout) {
        res.send(content);
        return;
      }
      res.render('index', {
        content,
        assets: manifest,
        state,
      });
    })
    .catch(next);
};

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-unresolved */
if (NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackIsomorphicDevMiddleware(compiler));
  app.use(require('webpack-hot-middleware')(compiler.compilers.find(c => c.name === 'client')));
  app.use((req, res, next) => {
    const render = res.locals.isomorphicCompilation.exports.default;
    const manifest = JSON.parse(compiler.compilers.find(c => c.name === 'client').outputFileSystem.readFileSync(path.join(__dirname, 'dist', 'client', 'manifest.json'), 'utf8'));
    createRenderer(render, manifest)(req, res, next);
  });
} else {
  const render = require('./dist/server/render').default;
  const manifest = require('./dist/client/manifest.json');
  app.use(express.static(path.join(__dirname, 'dist', 'client')));
  app.use(createRenderer(render, manifest));
}
/* eslint-enable import/no-extraneous-dependencies, global-require */

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.end();
});

app.listen(3000);
