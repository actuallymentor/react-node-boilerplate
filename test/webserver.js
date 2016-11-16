var expect    = require( "chai" ).expect
var request	  = require( "request" )
// Import environment
var dotenv = require( 'dotenv' )
dotenv.load()

describe( 'Webserver status', (  ) => {
	describe( '200 Status on GET /', (  ) => {
		it( 'Returns 200 status code', ( done ) => {
			request( process.env.appURL, (error, response, body) => {
				expect( response.statusCode ).to.equal( 200 )
				done()
			} )
		} )
	} )
} )