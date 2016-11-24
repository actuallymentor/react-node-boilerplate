// Import environment
var dotenv = require( 'dotenv' )
process.env.noenv ? '' : dotenv.load()

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

/////////////////////////////
// Starting application
////////////////////////////

// Synchronise with database
db.conn.sync( {force: dev.bool( process.env.dbForce )} )
	// Upon sync start the server
	.then( db => {

		// Seed database with data if we are in dev environment
		( dev.bool( process.env.NODE_ENV == 'development' ) ) ? require( __dirname + '/modules/data-seed'  ) : console.log( 'Production, not seeding database' )
		dev.log ( 'Database sync succeeded' )

		// Listen for requests
		var server = app.listen ( Number( process.env.port ), () => {
			if ( dev.bool( process.env.verbose ) )
				console.log( 'App listening on port: ' + server.address().port )
		} )

	} )
	// If there is an error, console it
	.catch( err => {
		console.log('Database sync failed: ' + err)
	} )

// For testing
module.exports = app