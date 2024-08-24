const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS members  ( 
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        first_name VARCHAR (255), 
        last_name VARCHAR (255), 
        username VARCHAR (255), 
        email VARCHAR (255), 
        password VARCHAR (255), 
        is_member BOOLEAN DEFAULT false, 
        is_admin BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS posts  ( 
        ids INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        member_id INTEGER REFERENCES members(id) ON DELETE CASCADE, 
        title TEXT, 
        message TEXT, 
        time TIMESTAMP
    );
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    try {
        await client.connect();
        await client.query(SQL);
        console.log("Done");
    } catch (err) {
        console.error("Error executing query:", err);
    } finally {
        await client.end();
    }
}

main();


