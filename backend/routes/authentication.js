// Require express
var express = require( 'express' )
var router 	= express.Router()

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

module.exports = router