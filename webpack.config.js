var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path  = __dirname;

var config = {
  entry: {
    main: './main.js'
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
  optimization: {
    splitChunks: {
      chunks: "async",
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
      }
    }
  },
  // plugins: [
  //   new BundleAnalyzerPlugin({
  //       analyzerMode: 'static'
  //   }),
  //
  // ],
  node: {
    fs: "empty"
  }
}

module.exports = config;
