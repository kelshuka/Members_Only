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
    
    const { rows } = await pool.query("SELECT * FROM members WHERE username = $1", [username]);
    return rows;
}

async function setMember(id){
    const memberSQL = `
        UPDATE members
        SET is_member = true
        WHERE members.id = $1;
    `;
    try {
        await pool.query(memberSQL, [id]);
        console.log(`Sucessfully added ${id} as member.`);
    } catch (error){
        console.error(`Error adding ${id} as member:`, error);
        throw error;
    }
}

async function addMessage(id, title, message){
    const messageSQL = `
    INSERT INTO posts (member_id, title, message, time)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP);`

    try{
        await pool.query(messageSQL, [id, title, message]);
        console.log(`Successfully inserted message ${message}!`);
    } catch (error) {
        console.error(`Error inserting message ${message}:`, error);
        throw error;
    }
}

async function fetchMessages(){
    const { rows } = await pool.query("SELECT * FROM posts JOIN members ON posts.member_id=members.id");
    return rows;
}



module.exports = {
    signUp,
    getUserByUsername,
    setMember,
    addMessage,
    fetchMessages
};