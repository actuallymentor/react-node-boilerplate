var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var autoprefixer = require ( 'autoprefixer' )
module.exports = {
  entry: __dirname + '/frontend/src/main.js',
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
        loaders: ["style", "css", "sass", "postcss"]
      }
    ]
  },
  postcss: [
    autoprefixer( { browsers: ['last 2 versions'] } )
  ],
  plugins: [
    new BrowserSyncPlugin( {
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['frontend/public'] },
      notify: {
        styles:  [
            "display: none",
            "padding: 15px",
            "font-family: sans-serif",
            "position: fixed",
            "font-size: 0.9em",
            "z-index: 9999",
            "bottom: 0px",
            "right: 0px",
            "border-bottom-left-radius: 5px",
            "background-color: #1B2032",
            "margin: 0",
            "color: white",
            "text-align: center"
        ]
      }
    } )
  ]
}