// Require express
var express = require( 'express' )
var router 	= express.Router()

// Get local passport module
var passport = require( __dirname + '/../modules/passport-global' )
var registerUser = require( __dirname + '/../modules/registration' )

// Router ping for debugging
router.use( passport.initialize(  ) )
router.use( passport.session(  ) )

// Login route
router.route( '/new' )
.post( ( req, res ) => {
	registerUser ( req.body.username, req.body.password, ( user, error ) => {
		if ( error ) {
			res.status( 418	).send( error )
		} else {
			// res.send( 'User ' + user.email + ' registered successfully' )
			req.login( user, (err) => {
				if ( err ) { return next( err ) }
					return res.send( 'User ' + user.email + ' registered successfully' )
			} )
		}
	} )

} )

module.exports = router