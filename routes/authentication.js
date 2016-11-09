// Require express
var express = require( 'express' )
var router 	= express.Router()
var session = require( 'express-session' )

// Get local passport module
var passport = require( __dirname + '/../modules/passport-global' )
var passportLocal = require( __dirname + '/../modules/passport-local' )

// Router ping for debugging
router.use( passport.initialize(  ) )
router.use( passport.session(  ) )

// Login route
router.route( '/local' )
.post( passportLocal.authenticate( 'local'), ( req, res ) => {
	res.send ( req.user )
} )

// Global logout route
router.route( '/destroy' )
.all( ( req, res ) => {
	req.logout(  )
	res.send( 'User logged out' )
} )
router.route( '/current' )
.get( ( req, res ) => {
	if ( req.user ) {
		console.log( 'User session exists as:' )
		console.log( req.user )
		res.send( req.user )
	} else {
		console.log( 'User is not defined: ' + req.user )
		res.status(418).send( undefined )
	}
} )

module.exports = router