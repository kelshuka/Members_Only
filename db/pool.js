const { Pool } = require("pg");
require("dotenv").config();

// original for my local
module.exports = new Pool({
    host: "localhost", 
    user: process.env.ROLE_NAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});