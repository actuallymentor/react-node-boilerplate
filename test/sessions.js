var expect    = require( "chai" ).expect
var request	  = require( "request" )

describe( 'Session and user management', (  ) => {
	describe( 'Default user login', (  ) => {
		it( 'Returns the default user', ( done ) => {
			request.post( process.env.appURL + '/login/new', { username: 'mentor@palokaj.co', password: 'pass' }, (error, response, body) => {
				expect( response.statusCode ).to.equal( 200 )
				done()
			} )
		} )
	} )
} )