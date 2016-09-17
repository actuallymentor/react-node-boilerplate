// Container object
var db = {
	mod: {}
}

// Get encryption
var bcrypt = require( 'bcrypt-nodejs' )

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

var demoUser = ( email, pass ) => {
	bcrypt.hash(pass, null, null, function(err, hash) {
		db.User.create( {
			email: email,
			password: hash
		} ).then( ( user ) => {
			console.log( 'Created ' + user.email + ' with pass ' + user.password )
		} )
	})	
}

// Synchronise with database
db.conn.sync( {force: help.boolean( process.env.dbForce )} ) .then( (  ) => {
	demoUser( 'mentor@palokaj.co', 'pass' )
	
} ).then( (  ) => {
	console.log ( 'Database sync succeeded' )
}, ( err ) => {
	console.log('Database sync failed: ' + err)
} 
)

module.exports = db