const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;


const ssl = false;

const pool = new Pool({
    connectionString: connectionString,
    ssl: ssl
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
    connectionString: connectionString,
    ssl: ssl
};