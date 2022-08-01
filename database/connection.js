const mysql = require('mysql');

const dataBase = mysql.createConnection({
  host: process.env.MARIADB_HOST,
  port:process.env.MARIADB_PORT,
  database: process.env.MARIADB_DATABASE,
  user: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD
});

module.exports = dataBase;