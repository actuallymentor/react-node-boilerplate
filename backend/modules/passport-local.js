// Import passport
var passport 		= require( 'passport' )
var LocalStrategy 	= require( 'passport-local' ).Strategy

// Import express and db connection
var express = require( 'express' )
var router 	= express.Router()
var db		= require( __dirname + '/../modules/database' )

console.log( 'Passport route initialisation' )

// Router ping for debugging
router.use( passport.initialize(  ) )
router.use( passport.session(  ) )

// Login procedure with the database
passport.use( new LocalStrategy(
	( username, password, done ) => {
		console.log( 'Attempting login with ' + username + ' and ' + password )
		db.User.findOne( { 
			where: {
				email: username
			}
		} ).then( ( user ) => {
			console.log( 'Found user ' + user.email )
			if ( user.password == password ) {
				console.log( 'Passport done trigger' )
				return done(null, user)
			} else if ( user.email != undefined ) {
				console.log( 'User not found' )
				return done( null, false, { 
					message: 'Incorrect username or password' 
				} )
			} else {
				console.log( 'Something really messed up' )
				return done( null, false, { 
					message: 'Something really messed up' 
				} )
			}
		} )
	} ) )

// Serialisation and deserialisation of the session
passport.serializeUser( ( user, done ) => {
	done( null, user.id )
} )

passport.deserializeUser( ( uid, done ) => {
	db.User.findOne( { 
		where: {
			id: uid
		}
	} ).then( ( user ) => {
		done( user )
	} )
} )

// Login route
router.route( '/local' )
.post( passport.authenticate( 'local'), ( req, res ) => {
	res.send ( req.user )
} )


// Export router
module.exports = router