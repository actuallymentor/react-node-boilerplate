// Require express
const express = require( 'express' )
const router 	= express.Router( )
const session = require( 'express-session' )

// Get helpers
const dev = require( __dirname + '/../modules/helpers' )

// Get local passport module
const passport = require( __dirname + '/../modules/passport-global' )
const passportLocal = require( __dirname + '/../modules/passport-local' )

// Router ping for debugging
router.use( passport.initialize( ) )
router.use( passport.session( ) )

// Local login route
router.route( '/local' )
.post( ( req, res, next ) => {

	// Call passport with a custom callback structure see http://passportjs.org/docs/authenticate
	passportLocal.authenticate( 'local', ( err, user, info ) => {

		// Debug and error statements
		dev.log( "After login the user is: " + user.email )
		if ( err ) return next( err )

		// If there is no user reject the request, return so as to break the flow
		if( !user ) {
			dev.log( 'User login failed' )
			return res.status( 401 ).send( {
				error: "Login failed"
			} )
			dev.log( 'Login error: ' + err )
		}

		// Log in the user if it exists
		req.login( user, err => {
			if ( err ) return next( err )

			// Send user data in reponse
			res.send ( {
				email: user.email,
				id: user.id
			} )

		} )

		// Give the request objects using closure syntax
	} )( req, res, next )
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
		dev.log( 'User session exists as:' )
		dev.log( req.user )
		res.send( {
			email: req.user.email,
			id: req.user.id
		} )
	} else {
		dev.log( 'User session is not defined: ' + req.user )
		res.status( 401 ).send( {
			error: "User not logged in"
		} )
	}
} )

module.exports = router