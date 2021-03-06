/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
var path = require("path");
var webpack = require("webpack");

var loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  }
];


module.exports = {
    cache: true,
    entry: {
      'beginner-tutorial': ['babel-polyfill', './beginner-tutorial/src/index.jsx'],
      traditional: ['babel-polyfill', './traditional/src/index.jsx']
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: loaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.es6'],
      alias: {
        'redux-retrieval': path.resolve(__dirname, '../src'),
        sharing: path.resolve(__dirname, 'sharing'),
      }
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    plugins: [

    ]
};
