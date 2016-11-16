var expect    = require( "chai" ).expect
var request	  = require( "request" )
// Import environment
var dotenv = require( 'dotenv' )
dotenv.load()

describe( 'Session and user management', (  ) => {
	describe( 'Default user login', (  ) => {
		it( 'Returns the default user', ( done ) => {
			request.post( process.env.appURL + '/login/local',{
				username: 'mentor@palokaj.co',
				password: 'pass'
			}, (error, response, body) => {
				expect( response.statusCode ).to.equal( 200 )
				done()
			} )
		} )
	} )
} )