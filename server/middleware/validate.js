const validator = require('validator');
const ErrorHandler = require('../middleware/error.class.js');

async function validateEmail(email) {
    if (!validator.isEmail(email)) {
        throw new ErrorHandler(401, 'Invalid email format');
    }
};

async function validatePassword(password) {
    if (!validator.isLength(password, { min: 8 })) {
        throw new ErrorHandler(400, 'Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
        throw new ErrorHandler(400, 'Password must include at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        throw new ErrorHandler(400, 'Password must include at least one lowercase letter');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new ErrorHandler(400, 'Password must include at least one special character');
    }
    if (!/\d/.test(password)) {
        throw new ErrorHandler(400, 'Password must include at least one number');
    }
};

module.exports = { validateEmail, validatePassword };