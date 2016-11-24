// Just a little function to translate strings to booleans
const bool = input => {
	if( input == 'true' ) {
		return true
	} else if ( input == 'false' ) {
		return false
	} else {
		return "ERROR"
	}
}

// Console logger if environment 'verbose' is set to true
const log = message => bool ( process.env.verbose ) ? console.log( message ) : ''

module.exports = {
	bool: bool,
	log: log
}