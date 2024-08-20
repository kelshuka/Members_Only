const pool = require("./pool");
const bcrypt = require('bcryptjs');


async function signUp(signer) {

    const hash = await bcrypt.hash(signer.password, 10); // "Salting" - safe method against attack.
    
    const { rows } = await pool.query("INSERT INTO members (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)", [
        signer.firstName, signer.lastName, signer.username, signer.email, hash,]
    );
    return rows;
}

async function getUserByUsername(username) {
    
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows;
}



module.exports = {
    signUp,
    getUserByUsername
};