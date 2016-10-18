// Import db connection
var db = require( __dirname + '/../modules/database' )

// Encryption library
var bcrypt = require( 'bcrypt-nodejs' )

var register = ( email, password, callback ) => {
	bcrypt.hash(password, null, null, (err, hash) => {
		db.User.findOne( {
			where: {
				email: email
			}
		} ).then( ( user ) => {
			if ( user ) {
				callback( null, 'User exists' )
			} else {
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