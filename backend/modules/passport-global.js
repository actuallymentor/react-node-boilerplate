// Import passport
var passportGlobal = require( 'passport' )

// Import db connection
var db = require( __dirname + '/../modules/database' )

// Serialisation and deserialisation of the session
passportGlobal.serializeUser( ( user, done ) => {
	done( null, user.id )
} )

passportGlobal.deserializeUser( ( uid, done ) => {
	db.User.findById( uid ).then( ( user ) => {
		user.password = 'correct'
		done( null, user.get( { plain: true } ) )
	} )
} )

module.exports = passportGlobal