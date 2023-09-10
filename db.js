const mysql = require('mysql2');

const dbpool = mysql.createPool({
  connectionLimit : 50, //important
//   host: dbconnection.host,
//   user: dbconnection.user,
//   password: dbconnection.password,
//   database: dbconnection.database,
host: 'testwattmonkdb-do-user-8587296-0.b.db.ondigitalocean.com', // database endpoint
port: 25060,
database: 'titansv4', // DB name
user: 'doadmin', // your username for mysql
password: 'AVNS_3lzv2XN5b491XBspt-2', // your password for mysql
  port: dbconnection.port,
  debug: false,
  waitForConnections: true,
  queueLimit: 0
});

