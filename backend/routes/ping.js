// Import express and db connection
var express = require( 'express' )
var router 	= express.Router()
var db		= require( __dirname + '/../modules/database' )

console.log( 'Ping route initialisation' )

// Router ping for debugging
router.route( '/routerping' )
.all( ( req, res ) => {
	res.send( 'Router pong' )
} )

// Export router
module.exports = router