var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/dist');
var APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: APP_DIR
      },
      { test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
