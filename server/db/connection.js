const util = require('util');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.CONNECTION_LIMIT,
  queueLimit: process.env.QUEUELIMIT
});

const ConnectionPool = {
  query: util.promisify(pool.query).bind(pool)
}

module.exports = ConnectionPool;