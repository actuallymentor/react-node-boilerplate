// Import passport
const passportGlobal = require( 'passport' )

// Import db connection
const db = require( __dirname + '/../modules/database' )

// Serialisation of the session
passportGlobal.serializeUser( ( user, done ) => done( null, user.id ) )

// Deserialisation of the session
passportGlobal.deserializeUser( ( uid, done ) => {

	// Grab user from the database by the user id
	db.User.findById( uid ).then( ( user ) => {
		done( null, user.get( { plain: true } ) )
	} )

} )

module.exports = passportGlobal