// Get encryption
const bcrypt = require( 'bcrypt' )
const db = require( __dirname + '/database.js' )

const demoUser = ( email, pass ) => {
	bcrypt.hash(pass, 10, function(err, hash) {
		db.User.create( {
			email: email,
			password: hash
		} ).then( ( user ) => {
			console.log( 'Created ' + user.email + ' with pass ' + user.password )
		} )
	})
}

demoUser( 'mentor@palokaj.co', 'pass' )

module.exports = 'Nothing'