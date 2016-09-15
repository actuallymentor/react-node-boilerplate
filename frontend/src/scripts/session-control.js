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
	this.setLoginUI = (  ) => { 		// Set the login modal title and button based on this.intent
		debug.log( 'Adapt login modal GUI' )
		$( '#loginform input' ).val( '' ) // empty the form
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
	this.login = (  ) => {				// Login behavior through the modal popup
		var email = $( '#loginuser' ).val(  )
		var pass  = $( '#loginpassword' ).val(  )
		var loginattempt = $.ajax( {
			url: '/login/local',
			method: 'POST',
			data: {
				username: email,
				password: pass
			}
		} )
		// Attempt to log in over ajax
		loginattempt.done( ( user ) => {
			debug.log( 'Login succeeded with status:' )
			debug.log( user )
			this.user = user // Set the user based on the response
			$( '#loginmessage' ).html( 'Login complete!' ).removeClass( 'hide' )
			$( '#loginmodal' ).closeModal(  )
			this.setLoginHeaderUI(  )
		} )
		// Catch the error and show it to the user
		loginattempt.fail( ( error, message ) => {
			debug.log( error )
			debug.log( message )
			$( '#loginmessage' ).html( 'Login failed!' ).removeClass( 'hide' )
		} )
	}
	this.setLoginHeaderUI = (  ) => {			// Update the UI to reflect the user details
		debug.log( 'User is ' )
		debug.log( this.user )
		if ( this.user != undefined ) {
			$( '#loggedoutmenu' ).addClass( 'hide' )
			$( '#loggedinmenu' ).removeClass( 'hide' )
			$( '#logoutmenubutton' ).html( 'Logout ' + this.user.email )
		} else {
			$( '#loggedoutmenu' ).removeClass( 'hide' )
			$( '#loggedinmenu' ).addClass( 'hide' )
			$( '#logoutmenubutton' ).html( 'Logout' )
		}
		$( '#loginmessage' ).html( '' ).addClass( 'hide' )
		$( '#loginmodal' ).closeModal(  )
	}


	// Click triggers for the modal
	$( '#loginmodal' )
	.on( 'click', '#toggleintent', ( click ) => {
			click.preventDefault(  )
			this.toggleIntent(  )
			this.setLoginUI(  )
		} )
	.on( 'submit', '#loginform', ( submit ) => {
			submit.preventDefault(  )
			this.login(  )
			this.setLoginUI(  )
		} )
	// Click triggers for the interface
	// Header
	$( '#nav' )
	.on( 'click', '#logoutmenubutton', ( click ) => {
		click.preventDefault(  )
		$.get( '/login/destroy', ( response ) => {
			debug.log( 'User logged out with: ' + response )
			this.user = undefined
			this.setLoginHeaderUI(  )
		} )
	} )
}

$( document ).ready(  ( DOM ) => {
	debug.log( 'Session control checking in ' )

	// Manage the interface
	var loginform = new loginFormManager(  )
	
} )