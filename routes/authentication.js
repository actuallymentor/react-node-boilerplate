// Require express
var express = require( 'express' )
var router 	= express.Router()
var session = require( 'express-session' )

// Get helpers
var dev = require( __dirname + '/../modules/helpers' )

// Get local passport module
var passport = require( __dirname + '/../modules/passport-global' )
var passportLocal = require( __dirname + '/../modules/passport-local' )

// Router ping for debugging
router.use( passport.initialize(  ) )
router.use( passport.session(  ) )

// Login route
// router.route( '/local' )
// .post( passportLocal.authenticate( 'local' ), ( req, res ) => {
// 	dev.log( "After login the user is: " + req.user.email )
// 	if( req.user ) {
// 		res.send ( {
// 			email: req.user.email,
// 			id: req.user.id
// 		} )
// 	} else {
// 		dev.log( 'User login failed' )
// 		res.status( 401 ).send( {
// 			error: "Login failed"
// 		} )
// 	}
// } )

router.route( '/local' )
.post( ( req, res, next ) => {
	// Call passport with a custom callback structure see http://passportjs.org/docs/authenticate
	passportLocal.authenticate( 'local', ( err, user, info ) => {
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