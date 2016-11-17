// Container object
var db = {}

// Get helpers
var help = require( __dirname + '/helpers' )

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize( process.env.dbName, process.env.dbUser, process.env.dbPass, {
	host: process.env.dbHost,
	dialect: process.env.dbDialect,
	define: {
		timestamps: help.boolean( process.env.dbTimestamps )
	}
} )

//// Models
// Users
db.User = db.conn.define( 'user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
})


// Synchronise with database
db.conn.sync( {force: help.boolean( process.env.dbForce )} ) .then( (  ) => {
	( help.boolean( process.env.NODE_ENV == 'development' ) ) ? require( __dirname + '/data-seed'  ) : console.log( 'Production, not seeding database' )
} ).then( (  ) => {
	console.log ( 'Database sync succeeded' )
}, ( err ) => {
	console.log('Database sync failed: ' + err)
}
)

module.exports = db