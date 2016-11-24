// Get express set up
const express 	  = require( 'express' )
const app 		  = express(  )
const bodyParser  = require( 'body-parser' )
const session 	  = require( 'express-session' )
const cookie      = require( 'cookie-parser' )
const dev 		  = require( __dirname + '/helpers' )

// Timestamp and request processing
app.use( function logger (req, res, next) {
  dev.log( req.method + ' ' + req.path + ' @ time: ', Date.now( ) )
  next( )
})

// Set the static to the public folder
app.use( express.static( __dirname + '/../frontend/public' ) )

// Set cookie usage
app.use( cookie( process.env.cookieSecret ) )

// Add post body processing
app.use( bodyParser.json( ) )

// Enable sessions
app.use( session( {
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
  	secure: dev.bool( process.env.cookieSecure ),
  	maxAge: Number( process.env.cookieMaxage )
  }
} ) )

module.exports = app