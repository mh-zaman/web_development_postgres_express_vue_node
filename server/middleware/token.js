const jwt = require('jsonwebtoken');
const ErrorHandler = require('../middleware/error.class.js');

async function signAccessToken(data) {
    try {
        return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRE });
    } catch (error) {
        throw new ErrorHandler(500, error.message);
    }
};

async function signRefreshToken(data) {
    try {
        return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRE });
    } catch (error) {
        throw new ErrorHandler(500, error.message);
    }
};

module.exports = { signAccessToken, signRefreshToken }