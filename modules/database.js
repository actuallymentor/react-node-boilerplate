// Container object
var db = {}

// Get helpers
var dev = require( __dirname + '/helpers' )

// Import environment
var dotenv = require( 'dotenv' )
dotenv.load()

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize( process.env.dbName, process.env.dbUser, process.env.dbPass, {
	host: process.env.dbHost,
	dialect: process.env.dbDialect,
	define: {
		timestamps: dev.bool( process.env.dbTimestamps )
	},
	logging: dev.bool( process.env.dbLogging )
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


module.exports = db