// Function to easily get GET parameters, source SO
function getGet( name, url ) {
	if ( !url ) url = window.location.href
	name = name.replace( /[\[\]]/g, "\\$&" )
	var regex = new RegExp( "[?&]" + name + "(=([^&#]*)|&|#|$)" ),
	results = regex.exec( url )
	if ( !results ) return null
	if ( !results[2] ) return ''
	return decodeURIComponent( results[2].replace( /\+/g, " " ) )
}

// Debug console logger, only console.log when ?debug is in URL
module.exports = {
	log: function ( message ) {
		if ( getGet( 'debug' ) != undefined ) console.log( message )
	}
}