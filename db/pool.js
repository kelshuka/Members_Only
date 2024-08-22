require("dotenv").config();
const { Pool } = require("pg");


// original for my local
module.exports = new Pool({
    host: "localhost", 
    user: process.env.ROLE_NAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

/* const isProduction = process.env.NODE_ENV === "production";

const connectionString = 
`postgresql://${process.env.ROLE_NAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;


const pool = new Pool({
    connectionString: isProduction ?  process.env.DATABASE_URL : connectionString ,
   /*  max: 5, //Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // 30 seconds
    connectionTimeoutMillis: 5000, // 5 seconds 
});

module.exports = pool; */