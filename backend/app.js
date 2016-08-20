console.log ( 'Initialising app' )

// Getting express
var app = require( './modules/express' )

// Listen for requests
var server = app.listen ( 3000, () => {
	console.log( 'App listening on port: ' + server.address().port )
} )