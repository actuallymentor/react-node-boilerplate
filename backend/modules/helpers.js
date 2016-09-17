module.exports = {
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