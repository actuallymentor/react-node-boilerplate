let loginFormManager = function (  ) {
	
	// Login form console
	debug.log( 'Loginform init' )
	this.intent = 'login' 				// Popup intent status
	this.user 	= undefined				// What user is logged in?
	this.toggleIntent = (  ) => {		// Toggle the intent status
		if ( this.intent == 'login' )
			this.intent = 'register'
		else 
			this.intent = 'login'
	}
	this.setInterface = (  ) => { 		// Set the login modal title and button based on this.intent
		debug.log( 'Adapt login modal GUI' )
		function setRegister(  ) {
			debug.log( 'Setting register' )
			$( '#logintitle, #loginbutton' ).html( 'Register' )
			$( '#toggleintent' ).html( 'Log into existing account' )
		}
		function setLogin(  ) {
			debug.log( 'Setting login' )
			$( '#logintitle, #loginbutton' ).html( 'Login' )
			$( '#toggleintent' ).html( 'Register an account' )
		}

		if( this.intent == 'login' )
			setLogin(  )
		else
			setRegister(  )

	}
	$( '#toggleintent' ) .on( 'click',	// Activate the above toggle prototype toggle function on click of text below the login button
		( click ) => {
			click.preventDefault(  )
			this.toggleIntent(  )
			this.setInterface(  )
		} )
}

$( document ).ready(  ( DOM ) => {
	debug.log( 'Session control checking in ' )

	// Manage the interface
	var loginform = new loginFormManager(  )
	
} )