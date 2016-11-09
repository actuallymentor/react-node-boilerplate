module.exports = {
	// Just a little function to translate strings to booleans
	boolean: ( input ) => {
		if( input == 'true' ) {
			return true
		} else if ( input == 'false' ) {
			return false
		} else {
			return "ERROR"
		}
	}
}