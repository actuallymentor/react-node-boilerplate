// Import passport
var passportGlobal = require( 'passport' )

// Serialisation and deserialisation of the session
passportGlobal.serializeUser( ( user, done ) => {
	done( null, user.id )
} )

passportGlobal.deserializeUser( ( uid, done ) => {
	db.User.findOne( { 
		where: {
			id: uid
		}
	} ).then( ( user ) => {
		done( user )
	} )
} )

module.exports = passportGlobal