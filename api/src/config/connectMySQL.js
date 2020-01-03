const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : 'localhost',
		user     : 'admin',
		password : 'admin',
		database : 'testdb'
	})
};