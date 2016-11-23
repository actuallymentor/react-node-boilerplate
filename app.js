// Import environment
var dotenv = require( 'dotenv' )
dotenv.load()

// Getting static express
var app = require( './modules/express' )

// Get helpers
var dev = require( __dirname + '/modules/helpers' )

// Connect, sync and import database models
var db = require( './modules/database' )

// Login management
app.use( '/login/', require( __dirname + '/routes/authentication' ) )

// Registration
app.use( '/register/', require( __dirname + '/routes/registration' ) )

// Sync the database
// Synchronise with database
db.conn.sync( {force: dev.bool( process.env.dbForce )} ) .then( (  ) => {
	( dev.bool( process.env.NODE_ENV == 'development' ) ) ? require( __dirname + '/modules/data-seed'  ) : console.log( 'Production, not seeding database' )
} ).then( (  ) => {
	dev.log ( 'Database sync succeeded' )
	// Listen for requests
	var server = app.listen ( Number( process.env.port ), () => {
		if ( process.env.NODE_ENV == 'development' )
			console.log( 'App listening on port: ' + server.address().port )
	} )
	// Throw an error if there is trouble
	}, ( err ) => {
		console.log('Database sync failed: ' + err)
} )

// For testing
module.exports = app