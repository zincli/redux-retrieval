var webpack = require('webpack');
var config = require('./webpack.config.dev');

config.plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      // This has effect on the react lib size
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['functor']
    }
  })
];

module.exports = config;
