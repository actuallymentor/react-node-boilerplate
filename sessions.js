var expect    = require( "chai" ).expect
var request	  = require( "request" )
// Import environment
var dotenv = require( 'dotenv' )
dotenv.load()

// describe( 'Session and user management', (  ) => {
// 	describe( 'Default user login', (  ) => {
// 		it( 'Returns the default user', ( done ) => {
// 			request.post( process.env.appURL + '/login/local',{
// 				username: 'mentor@palokaj.co',
// 				password: 'pass'
// 			}, (error, response, body) => {
// 				expect( response.statusCode ).to.equal( 200 )
// 				done()
// 			} )
// 		} )
// 	} )
// } )

////////////////////////
// Accept authorized
////////////////////////

let demoUser = { username: "invisible@octopus.co", password: "octastic" }

describe( 'User API acceptance', f => {

	let Cookies

	// Registration test
	describe( 'creating new user', f => {
		// Data return check
		it( 'registers new user & returns it', done => {
			request( {
				uri: process.env.appURL + '/register/new',
				method: 'POST',
				json: true,
				body: demoUser
			} )
			.on( "response", response => {
				expect( response.statusCode ).to.equal( 200 )
			} )
			.on( "data", rawdata => {
				let jsondata = JSON.parse( rawdata )
				expect( jsondata.email ).to.equal( demoUser.username )
				done(  )
			} )
		} )
	} )

	// Login test
	describe( 'demo user login', f => {
		// Data return check
		it( 'returns demo user', done => {
			request( {
				uri: process.env.appURL + '/login/local',
				method: 'POST',
				json: true,
				body: demoUser
			} )
			.on( "data", rawdata => {
				let jsondata = JSON.parse( rawdata )
				expect( jsondata.email ).to.equal( demoUser.username )
				done(  )
			} )
			.on( "response", response => {
				Cookies = response.headers['set-cookie'].pop().split(';')[0]
			} )
		} )
	} )

	// Session exists
	describe( 'reject unauthenticated users', f => {
		it( 'rejects the session request', done => {
			request( {
				uri: process.env.appURL + '/login/current',
				method: 'GET',
				json: true
			} )
			.on( "response", response => {
				console.log( "Login status " + response.statusCode )
				done(  )
			} )
		} )
	} )

} )

////////////////////////
// Reject unauthorized
////////////////////////

/*
let notUser  = { username: "not@octopus.co", password: "octastic" }

describe( 'User API rejection', f => {
	// Failing login test
	describe( 'reject unregistered users', f => {
		it( 'rejects the request', done => {
			request( {
				uri: process.env.appURL + '/login/local',
				method: 'POST',
				json: true,
				body: notUser
			} )
			.on( "response", response => {
				expect( response.statusCode ).to.equal( 401 )
				done(  )
			} )
		} )
	} )

	// Failing session query
	describe( 'reject unauthenticated users', f => {
		it( 'rejects the session request', done => {
			request( {
				uri: process.env.appURL + '/login/current',
				method: 'GET',
				json: true
			} )
			.on( "response", response => {
				expect( response.statusCode ).to.equal( 401 )
				done(  )
			} )
		} )
	} )

} )
*/