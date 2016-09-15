// Container object
var db = {
	mod: {}
}
var bcrypt = require( 'bcrypt-nodejs' )

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize( 'Mentor', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
	define: {
		timestamps: false
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

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Synchronise with database
db.conn.sync( {force: true} ) .then( (  ) => {
	bcrypt.hash("ohnoplaintext", null, null, function(err, hash) {
    db.User.create( {
		email: 'mentor@palokaj.co',
		password: hash
	} ).then( ( user ) => {
		console.log( 'Created ' + user.email + ' with pass ' + user.password )
	} )
	})	
	
} ).then( (  ) => {
	console.log ( 'Database sync succeeded' )
}, ( err ) => {
	console.log('Database sync failed: ' + err)
} 
)

module.exports = db