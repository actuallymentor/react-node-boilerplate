// Get encryption
const bcrypt = require( 'bcrypt' )
const db = require( __dirname + '/database.js' )

// Get helpers
let dev = require( __dirname + '/helpers' )

const demoUser = ( email, pass ) => {

	// Hash the user password
	bcrypt.hash(pass, 10, function(err, hash) {

		// Send the user to the db with the hashed password
		db.User.create( {
			email: email,
			password: hash
		} ).then( ( user ) => {
			dev.log( 'Created ' + user.email + ' with pass ' + user.password )
		} )

	})
}

if ( process.env.NODE_ENV == 'development' ) demoUser( 'mentor@palokaj.co', 'pass' )

module.exports = 'Nothing'