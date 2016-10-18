console.log ( 'Initialising app' )

// Import environment
var dotenv = require( 'dotenv' )
dotenv.load()

// Getting static express
var app = require( './modules/express' )

// Connect, sync and import database models
var db = require( './modules/database' )

// Login management
app.use( '/login/', require( __dirname + '/routes/authentication' ) )

// Registration
app.use( '/register/', require( __dirname + '/routes/registration' ) )

// Listen for requests
var server = app.listen ( Number( process.env.port ), () => {
	console.log( 'App listening on port: ' + server.address().port )
} )