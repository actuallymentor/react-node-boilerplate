// Import db connection
var db = require( __dirname + '/../modules/database' )

// Encryption library
var bcrypt = require( 'bcrypt' )

var register = ( email, password, callback ) => {

	// Has the POSTed password with bcrypt
	bcrypt.hash(password, 10, (err, hash) => {
		db.User.findOne( {
			where: {
				email: email
			}
		} ).then( ( user ) => {
			// Ceck if user exists
			if ( user ) {
				callback( null, 'User exists' )
			} else {
				// Create user if it does not exist
				db.User.create( {
					email: email,
					password: hash
				} ).then( ( user ) => {
					if ( user.email != undefined ) {
						callback( user, null )
					} else {
						callback( null, 'User exists error' )
					}
				} )
			}

		} )
	} )
}

module.exports = register