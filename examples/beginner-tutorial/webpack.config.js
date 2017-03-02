var config = require('../webpack.config.dev');

config.entry = {
  'beginner-tutorial': ['babel-polyfill', './beginner-tutorial/src/index.jsx']
};

module.exports = config;
