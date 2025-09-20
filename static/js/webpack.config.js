'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/main-page'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};