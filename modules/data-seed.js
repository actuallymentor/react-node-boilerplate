// Get encryption
const bcrypt = require( 'bcrypt' )
const db = require( __dirname + '/database.js' )

// Get helpers
var dev = require( __dirname + '/helpers' )

const demoUser = ( email, pass ) => {
	bcrypt.hash(pass, 10, function(err, hash) {
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