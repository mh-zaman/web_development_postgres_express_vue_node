const pool = require('../config/db.config.index.js');

async function getAllUsersDB() {
    try {
        const { rows: users } = await pool.query('select * from users');
        return users;
    } catch (error) {
        console.error("Error executing query:", error);
    }
};

async function getUserByIdDB(id) {
    const { rows: user } = await pool.query(`select * from users where id = $1`, [id]);
    return user[0];
};

async function createUserDB({ username, email, password, name, avatar }) {
    email = email.trim();
    avatar = avatar || null;
    try {
        const { rows: user } = await pool.query
            (`insert into users(username, email, password, name, avatar) values(lower($1), lower($2), $3, $4, $5) returning *`,
                [username, email, password, name, avatar]);
        console.log(user[0]);
        return user[0];
    } catch (error) {
        console.error("Error executing query:", error);
    }
};

async function getUserByUsername(username) {
    try {
        const { rows: user } = await pool.query(`select * from users where username = lower($1)`, [username]);
        return user[0];
    } catch (error) {
        console.error("Error executing query:", error);
    }
};

async function getUserByEmail(email) {
    try {
        const { rows: user } = await pool.query(`select * from users where email = lower($1)`, [email]);
        return user[0];
    } catch (error) {
        console.error("Error executing query:", error);
    }
};

async function getUsername(username) {
    try {
        const { rows: userName } = await pool.query(`select username from users where username = lower($1)`, [username]);
        return userName[0];
    } catch (error) {
        console.error("Error executing query:", error);
    }
};

async function getEmail(email) {
    try {
        const { rows: mail } = await pool.query(`select email from users where email = lower($1)`, [email]);
        return mail[0];
    } catch (error) {
        console.error("Error executing query:", error);
    }
};

async function updateUserDB({ id, username, email, name, avatar }) {
    const { rows: user } = await pool.query(`update users set username = $2, email = $3, name = $4, avatar = $5 where id = $1 returning *`,
        [id, username, email, name, avatar],
    );
    return user[0];
};

async function deleteUserDB(id) {
    const { rows: user } = await pool.query(`delete from users where id = $1 returning *`, [id]);
    return user[0];
}



module.exports = { getAllUsersDB, getUsername, getUserByUsername, getEmail, getUserByEmail, createUserDB, getUserByIdDB, updateUserDB, deleteUserDB };