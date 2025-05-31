const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.PORT_NUMBER,
});

pool.connect();
module.exports = pool;
