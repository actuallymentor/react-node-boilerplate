// Import passport
var passportLocal 		= require( __dirname + '/passport-global' )
var LocalStrategy 	= require( 'passport-local' ).Strategy

// Encryption library
var bcrypt = require( 'bcrypt-nodejs' )

// Import db connection
var db		= require( __dirname + '/../modules/database' )

// Login procedure with the database
passportLocal.use( new LocalStrategy(
	( username, password, done ) => {
		console.log( 'Attempting login with ' + username + ' and ' + password )
		db.User.findOne( { 
			where: {
				email: username
			}
		} ).then( ( user ) => {
			if( user == undefined ) {
				console.log( 'User not found' )
				return done( null, false, { 
					message: 'Incorrect username or password' 
				} )
			}
			console.log( 'Found user ' + user.email )
			bcrypt.compare( password, user.password, ( err, res ) => {
				console.log( 'Password evaluated ' + res )
				if ( res == true ) {
					user.password = 'correct'
					return done(null, user)
				} else {
				console.log( 'Something really messed up' )
				return done( null, false, { 
					message: 'Something really messed up' 
				} )
			}
			} )
		} )
	} ) )

// Export passport
module.exports = passportLocal