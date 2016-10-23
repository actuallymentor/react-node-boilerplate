module.exports = {
  entry: __dirname + '/frontend/src/scripts/main.js',
  output: {
    filename: __dirname + '/frontend/public/js/app.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}