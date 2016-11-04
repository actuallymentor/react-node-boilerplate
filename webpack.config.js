var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
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
  },
  plugins: [
    new BrowserSyncPlugin( {
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['frontend/public'] }
    } )
  ]
}