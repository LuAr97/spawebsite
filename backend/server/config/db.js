const mysql = require('mysql2')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "password",
database:"stellaspa" 
})

module.exports = db;