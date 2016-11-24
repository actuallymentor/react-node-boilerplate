// Import db connection
const db = require( __dirname + '/../modules/database' )

// Encryption library
const bcrypt = require( 'bcrypt' )

const register = ( email, password, callback ) => {

	// Hash the POSTed password with bcrypt
	bcrypt.hash(password, 10, (err, hash) => {

		// Grab the user from the database
		db.User.findOne( {
			where: {
				email: email
			}
		} ).then( ( user ) => {

			// Check if user exists
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