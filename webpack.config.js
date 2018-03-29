var path  = __dirname;

module.exports = {
  entry: {
    main: './main.js'
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      $: "jQuery",
      $: '$'
    }
  },
}
