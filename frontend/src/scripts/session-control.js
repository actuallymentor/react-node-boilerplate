let userSessionControl = function (  ) {
	
	// Login form console
	debug.log( 'Loginform init' )
	this.data = {
		authIntent: 'login',
		user: undefined
	}
	this.toggleIntent = (  ) => {		// Toggle the intent status
		if ( this.data.authIntent == 'login' )
			this.data.authIntent = 'register'
		else 
			this.data.authIntent = 'login'
	}

	this.setLoginUI = (  ) => { 		// Set the login modal title and button based on intent
		debug.log( 'Adapt login modal GUI' )
		$( '#loginform input' ).val( '' ) // empty the form
		function setRegister(  ) {
			debug.log( 'Setting register' )
			$( '#logintitle, #loginbutton' ).html( 'Register' )
			$( '#toggleintent' ).html( 'Log into existing account' )
		}
		function setloginRegister(  ) {
			debug.log( 'Setting login' )
			$( '#logintitle, #loginbutton' ).html( 'Login' )
			$( '#toggleintent' ).html( 'Register an account' )
		}

		if( this.data.authIntent == 'login' )
			setloginRegister(  )
		else
			setRegister(  )
	}

	this.loginRegister = (  ) => {				// Login behavior through the modal popup
		var email = $( '#loginuser' ).val(  )
		var pass  = $( '#loginpassword' ).val(  )
		var action = (  ) => {
			if( this.data.authIntent == 'login' ) {
				return '/login/local'
			} else {
				return '/register/new'
			}
		}
		var loginattempt = $.ajax( {
			url: action(  ),
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
			this.data.user = user // Set the user based on the response
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
		if ( this.data.user != undefined ) {
			debug.log( this.data.user )
			$( '#loggedoutmenu' ).addClass( 'hide' )
			$( '#loggedinmenu' ).removeClass( 'hide' )
			$( '#logoutmenubutton' ).html( 'Logout ' + this.data.user.email )
		} else {
			$( '#loggedoutmenu' ).removeClass( 'hide' )
			$( '#loggedinmenu' ).addClass( 'hide' )
			$( '#logoutmenubutton' ).html( 'Logout' )
		}
		$( '#loginmessage' ).html( '' ).addClass( 'hide' )
	}

	this.getCurrentUser = cb => {
		$.ajax( {
			url: '/login/current',
			method: 'GET'
		} )
		// Attempt to get session over ajax
		.done( ( user ) => {
			if( user.email != undefined ) {
				debug.log( 'User session retreived: ' )
				debug.log( user )
				this.data.user = user // Set the user based on the response
			}
			cb(  )
		} )
		// Catch the error and show it to the user
		.fail( ( error, message ) => {
			debug.log( 'No user session' )
			this.data.user = null
			cb(  )
		} )
	}

	this.updateGlobalUI = (  ) => {
		debug.log( 'Update global UI' )
		this.getCurrentUser( this.setLoginHeaderUI )
	}

	this.triggers = (  ) => {
		// Click triggers for the modal
		$( '#loginmodal' )
		.on( 'click', '#toggleintent', click => {
			click.preventDefault(  )
			this.toggleIntent(  )
			this.setLoginUI(  )
		} )
		.on( 'submit', '#loginform', submit => {
			submit.preventDefault(  )

			if ( this.data.authIntent == 'login' ) {
				this.loginRegister(  )
			} else if ( this.data.authIntent == 'register' ) {
				this.loginRegister(  )
			}

			this.setLoginUI(  )
		} )
		// Click triggers for the interface
		// Header
		$( '#nav' )
		.on( 'click', '#logoutmenubutton', ( click ) => {
			click.preventDefault(  )
			$.get( '/login/destroy', ( response ) => {
				debug.log( 'User logged out with: ' + response )
				this.data.user = undefined
				this.setLoginHeaderUI(  )
			} )
		} )
	}

	this.dynamicUpdate = (  ) => {
		// Periodic check for being logged in  etc
		setInterval( this.updateGlobalUI, 10 * 1000 )
	}
	
}

$( document ).ready(  DOM => {
	debug.log( 'Session control checking in ' )

	// Manage the interface
	var userManager = new userSessionControl(  )
	userManager.updateGlobalUI(  )
	userManager.triggers(  )
	userManager.dynamicUpdate(  )
	
} )