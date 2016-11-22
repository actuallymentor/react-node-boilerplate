const bool = input => {
	if( input == 'true' ) {
		return true
	} else if ( input == 'false' ) {
		return false
	} else {
		return "ERROR"
	}
}

const log = message => {
	if ( bool ( process.env.verbose ) ) {
		console.log( message )
	}
}

module.exports = {
	// Just a little function to translate strings to booleans
	bool: bool,
	// Logger if environment agrees
	log: log
}