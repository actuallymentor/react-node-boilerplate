// Get express set up
var express 	  = require( 'express' )
var app 		    = express(  )
var bodyParser 	= require( 'body-parser' ) // POST body parser
var session 	  = require( 'express-session' )
var cookie      = require( 'cookie-parser' )

// Timestamp and request processing
app.use( function logger (req, res, next) {
	console.log( req.method + ' ' + req.path + ' @ time: ', Date.now() )
	next()
})

// Set the static to the public folder
app.use( express.static( __dirname + '/../../frontend/public' ) )

// Set cookie usage
app.use( cookie( process.env.cookieSecret ) )

// Add post body processing
app.use( bodyParser.urlencoded( {extended: true} ) )

// Enable sessions
app.use( session( {
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { 
  	secure: process.env.cookieSecure,
  	maxAge: process.env.cookieMaxage
  	 }
} ) )

console.log( 'Express module imported' )
module.exports = app