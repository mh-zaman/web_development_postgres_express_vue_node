const jwt = require('jsonwebtoken');
const pool = require('../db/config/db.config.index');
const ErrorHandler = require('../middleware/error.class.js');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new ErrorHandler(401, 'Token not found in header');
    }
    try {
        const verified = jwt.verify(token, process.env.ACCESS_SECRET);
        const { rows: user } = await pool.query(`select * from users where id = $1`, [verified.id]);
        if (!user[0]) {
            throw new ErrorHandler(401, 'Invalid user access');
        }
        req.user = user[0];
        next();
    } catch (error) {
        throw new ErrorHandler(401, error.message || 'Invalid token');
    }
};

module.exports = { verifyToken };