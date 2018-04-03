const webpack = require('webpack');
const path  = __dirname;

var config = {
  entry: {
    main: './main.js'
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jquery: 'jQuery',
  //     "window.jQuery" : "jquery"
  //   })
  // ],
  output: {
    path: __dirname + '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'env']
        }
      },
      {
        test: /vendor\/.+\.(jsx|js)$/,
        loader: "imports?jQuery=jquery,$=jquery,this=>window"
      }
    ]
  },
  node: {
    fs: "empty"
  }
}

module.exports = config;
