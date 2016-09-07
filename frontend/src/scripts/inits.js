// 
// Helpers
// 

function getGet( name, url ) {			// Function to easily get GET parameters, source SO
	if ( !url ) url = window.location.href
	name = name.replace( /[\[\]]/g, "\\$&" )
	var regex = new RegExp( "[?&]" + name + "(=([^&#]*)|&|#|$)" ),
	results = regex.exec( url )
	if ( !results ) return null
	if ( !results[2] ) return ''
	return decodeURIComponent( results[2].replace( /\+/g, " " ) )
}

var debug = {							// Debug console logger, only console.log when ?debug is in URL
	log: function ( message ) {
		if ( getGet( 'debug' ) != undefined ) console.log( message )
	}
}

// After DOM load
$( document ).ready(  ( DOM ) => {
	debug.log( 'Inits checking in' )
	$('.modal-trigger').leanModal();	// Init materialize modal functionality
} )