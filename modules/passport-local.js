// Import passport
const passportLocal 	= require( __dirname + '/passport-global' )
const LocalStrategy 	= require( 'passport-local' ).Strategy

// Encryption library
const bcrypt = require( 'bcrypt' )

// Get helpers
const dev = require( __dirname + '/helpers' )

// Import db connection
const db	= require( __dirname + '/../modules/database' )

// Login procedure with the database
passportLocal.use( new LocalStrategy(

	// Set the default user field to email instead of 'username'
	{ usernameField: 'email' },
	( email, password, done ) => {

		// Debug statement
		dev.log( 'Attempting login with ' + email + ' and ' + password )

		// Find the user requested
		db.User.findOne( {
			where: {
				email: email
			}
		} ).then( ( user ) => {

			// If no matching user is found return errors
			if( !user ) {
				dev.log( 'User not found' )
				return done( null, false, {
					message: 'Incorrect email or password'
				} )
			}

			// Debug statement
			dev.log( 'Found user ' + user.email )

			// Check if the user from the db matches the POSTed user`
			bcrypt.compare( password, user.password, ( err, match ) => {
				dev.log( 'Password evaluated ' + match )
				if ( match ) {
					return done(null, user)
				} else {
					dev.log( 'Password did not match' )
					return done( null, false, {
						message: 'Password did not match'
					} )
				}
			} )
		} )
	} ) )

// Export passport
module.exports = passportLocal