// Import passport
var passportLocal 	= require( __dirname + '/passport-global' )
var LocalStrategy 	= require( 'passport-local' ).Strategy

// Encryption library
var bcrypt = require( 'bcrypt' )

// Get helpers
var dev = require( __dirname + '/helpers' )

// Import db connection
var db	= require( __dirname + '/../modules/database' )

// Login procedure with the database
passportLocal.use( new LocalStrategy(
	// Set the default user field to email
	{ usernameField: 'email' },
	( email, password, done ) => {

		// Verbose statement
		dev.log( 'Attempting login with ' + email + ' and ' + password )

		// Find the user reuested
		db.User.findOne( {
			where: {
				email: email
			}
		} ).then( ( user ) => {
			if( !user ) {
				dev.log( 'User not found' )
				return done( null, false, {
					message: 'Incorrect email or password'
				} )
			}

			// Verbose statement
			dev.log( 'Found user ' + user.email )

			// Check if the user from the db matches the POSTed user`
			bcrypt.compare( password, user.password, ( err, res ) => {
				dev.log( 'Password evaluated ' + res )
				if ( res == true ) {
					return done(null, user)
				} else {
					dev.log( 'Something really messed up' )
					return done( null, false, {
						message: 'Something really messed up'
					} )
				}
			} )
		} )
	} ) )

// Export passport
module.exports = passportLocal