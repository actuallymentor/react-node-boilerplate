// Require express
const express = require( 'express' )
const router 	= express.Router( )

// Get local passport module
const passport = require( __dirname + '/../modules/passport-global' )
const registerUser = require( __dirname + '/../modules/registration' )

// Router ping for debugging
router.use( passport.initialize( ) )
router.use( passport.session( ) )

// Get helpers
const dev = require( __dirname + '/../modules/helpers' )

// Login route
router.route( '/new' )
.post( ( req, res ) => {

	// Call the registration module
	registerUser ( req.body.email, req.body.password, ( user, error ) => {

		// Log potential errors
		if ( error ) {
			dev.log( "Registration error: " + error )

			// Send the frontend the error message
			res.status( 401	).send( {
				error: error
			} )

		} else {

			// Call the passport login function with the user returned by the register module
			req.login( user, (err) => {
				if ( err ) return next ( err )

					// Return frontend relevant data
					return res.send( {
						id: user.id,
						email: user.email
					} )

			} )
		}
	} )

} )

module.exports = router