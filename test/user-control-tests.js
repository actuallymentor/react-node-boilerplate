let expect    = require( "chai" ).expect
let request	  = require( "supertest" )

// import the app
let server = require( __dirname + "/../app.js" )

// Import environment
let dotenv = require( 'dotenv' )
dotenv.load()
process.env.NODE_ENV = 'production'
process.env.verbose = false

// Testing placeholder with the app
let app = request( server )

////////////////////////
// Api server status
///////////////////////
describe( 'Server status' , f => {
	// Server test
	describe( 'GET / ', f => {
		// Data return check
		it( 'server is online', done => {
			app.get( '/' )
				.expect( 200, done )
		} )
	} )
})

////////////////////////
// Accept authorized
////////////////////////

let demoUser = { email: "invisible@octopus.co", password: "octastic" }


describe( 'User API acceptance', f => {

	// Central cookie store for this test battery
	let Cookies

	// Registration test
	describe( 'user creation @ POST /register/new', f => {
		it( 'registers & returns new user', done => {
			app
			.post( '/register/new' )
			.send( demoUser )
			.expect('Content-Type', /json/)
			.expect( 200, {
				id: '1',
				email: demoUser.email
			}, done )
		} )
	} )

	// Login test ( successful )
	describe( 'user login @ POST /login/local', f => {
		it( 'returns requested user', done => {
			app
			.post( '/login/local' )
			.send( demoUser )
			.expect('Content-Type', /json/)
			.expect( 200, {
				id: '1',
				email: demoUser.email
			} )
			.end( ( err, res ) => {
				Cookies = res.headers['set-cookie'].pop().split(';')[0]
				done(  )
			} )
		} )
	} )

	// Check current user session
	describe( 'user session @ GET /login/current', f => {
		it( 'returns the current user', done => {
			let req = app.get( '/login/current' )
			req.cookies = Cookies
			req.set( 'Accept', 'application/json' )
			.expect( 200, {
				id: '1',
				email: demoUser.email
			}, done )
		} )
	} )

} )

///////////////////////
// Reject unauthorized
///////////////////////

let ghostUser = { email: "ghost@octopus.co", password: "octastic" }

describe( 'User API rejection', f => {

	// Duplicate registration test
	describe( 'duplicate registration @ POST /register/new', f => {
		it( 'rejects user and returns error message', done => {
			app
			.post( '/register/new' )
			.send( demoUser )
			.expect('Content-Type', /json/)
			.expect( 401, {
				error: "User exists"
			}, done )
		} )
	} )

	// Login test ( unsuccessful )
	describe( 'unauthorised login @ POST /login/local', f => {
		it( 'rejects login and returns error message', done => {
			app
			.post( '/login/local' )
			.send( ghostUser )
			.expect('Content-Type', /json/)
			.expect( 401, {
				error: 'Login failed'
			}, done )
		} )
	} )

	// Check nonexistent user session
	describe( 'no session active @ GET /login/current', f => {
		it( 'returns error message', done => {
			app.get( '/login/current' )
			.expect( 401, {
				error: "User not logged in"
			}, done )
		} )
	} )

} )