require("dotenv").config();
const { Pool } = require("pg");



const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
   
});

module.exports = pool;

// original for my local
/* module.exports = new Pool({
    host: "localhost", 
    user: process.env.ROLE_NAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
}); */