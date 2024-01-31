const { Pool } = require('pg');

const connectionString = `postgresql://postgres:mhzaman999@localhost:5432/node_rest_api_postgresql`;


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