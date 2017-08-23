const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const addHash = (template, hash) => (NODE_ENV === 'production' ? template.replace(/\.[^.]+(\.map)?$/, `.[${hash}]$&`) : template);

const clientConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: (files => (NODE_ENV !== 'production' ? [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
    ] : []).concat(files))(['./js/app']),
    vendor: ['babel-polyfill', './js/vendor'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: addHash('assets/js/[name].js', 'chunkhash'),
    sourceMapFilename: addHash('assets/js/[name].js.map', 'chunkhash'),
  },
  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['src/js/app', 'node_modules'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)?(\?v=\d+.\d+.\d+)?$/,
        loader: addHash('file?name=assets/[path][name].[ext]', 'hash'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(path.join('dist')),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(NODE_ENV !== 'production'),
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
      },
    ]),
    new ManifestPlugin({
      publicPath: '/',
    }),
    new ExtractTextPlugin(addHash("assets/styles/[name].css", 'contenthash'), {allChunks: true}),
  ],
};

if (NODE_ENV !== 'production') {
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = clientConfig;
