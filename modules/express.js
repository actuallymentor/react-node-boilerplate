// Get express set up
var express 	  = require( 'express' )
var app 		  = express(  )
var bodyParser 	  = require( 'body-parser' ) // POST body parser
var session 	  = require( 'express-session' )
var cookie        = require( 'cookie-parser' )
var help 		  = require( __dirname + '/helpers' )

// Timestamp and request processing
app.use( function logger (req, res, next) {
	console.log( req.method + ' ' + req.path + ' @ time: ', Date.now() )
	next()
})

// Set the static to the public folder
app.use( express.static( __dirname + '/../frontend/public' ) )

// Set cookie usage
app.use( cookie( process.env.cookieSecret ) )

// Add post body processing
app.use( bodyParser.json(  ) )

// Enable sessions
app.use( session( {
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
  	secure: help.boolean( process.env.cookieSecure ),
  	maxAge: Number( process.env.cookieMaxage )
  	 }
} ) )

console.log( 'Express module imported' )
module.exports = app