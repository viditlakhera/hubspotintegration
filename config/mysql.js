const config = require('config');
const mysql = require('mysql2');
let dbconnection = config.get('dbconnection');

//configuration for creating my sql connection

const pool = mysql.createPool({
  connectionLimit : 50, //important
  host: dbconnection.host,
  user: dbconnection.user,
  password: dbconnection.password,
  database: dbconnection.database,
  port: dbconnection.port,
  debug    :  false
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});
module.exports = pool
