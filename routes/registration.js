// Require express
var express = require( 'express' )
var router 	= express.Router()

// Get local passport module
var passport = require( __dirname + '/../modules/passport-global' )
var registerUser = require( __dirname + '/../modules/registration' )

// Router ping for debugging
router.use( passport.initialize(  ) )
router.use( passport.session(  ) )

// Get helpers
var dev = require( __dirname + '/../modules/helpers' )

// Login route
router.route( '/new' )
.post( ( req, res ) => {
	registerUser ( req.body.email, req.body.password, ( user, error ) => {
		if ( error ) {
			dev.log( "Registration error: " + error )
			res.status( 401	).send( {
				user: undefined,
				error: error
			} )
		} else {
			req.login( user, (err) => {
				if ( err ) { return next( err ) }
					user.password = 'correct'
					return res.send( {
						id: user.id,
						email: user.email
					} )
			} )
		}
	} )

} )

module.exports = router