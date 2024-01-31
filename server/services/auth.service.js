const signupDB = require('../db/functions/auth.db.js');
const ErrorHandler = require('../middleware/error.class.js');
const { hashPassword, comparePassword } = require('../middleware/hash.js');
const { signAccessToken, signRefreshToken } = require('../middleware/token.js');
const { validateEmail, validatePassword } = require('../middleware/validate.js');
const { getUsername, getUserByUsername, getEmail, getUserByEmail, createUserDB } = require('../db/functions/user.db');

async function signupService(user) {
    try {
        const { username, email, password, name, avatar } = user;

        if (!username || !email || !password || !name)
            throw new ErrorHandler(401, 'All fields required');

        await validateEmail(email);

        await validatePassword(password);

        const findByUsername = await getUsername(username);
        if (findByUsername)
            throw new ErrorHandler(401, 'Username already taken');

        const findByEmail = await getEmail(email);
        if (findByEmail)
            throw new ErrorHandler(401, 'Email already exists');

        const hashedPassword = await hashPassword(password);

        const newUser = await createUserDB({ ...user, password: hashedPassword });

        const accessToken = await signAccessToken({ id: newUser.id });

        const refreshToken = await signRefreshToken({ id: newUser.id });

        return { accessToken, refreshToken, user: newUser };

    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
};

async function signinService(user) {
    try {
        const { username, email, password } = user;

        if (email) {
            await validateEmail(email);
        }
        await validatePassword(password);

        const userByUsername = await getUserByUsername(username);

        const userByEmail = await getUserByEmail(email);

        const newUser = userByEmail || userByUsername;
        if (!newUser) {
            throw new ErrorHandler(403, 'No user found with this username or email');
        }

        const isCorrectPassword = await comparePassword(password, newUser.password);

        if (!isCorrectPassword) {
            throw new ErrorHandler(403, 'Incorrect password');
        }

        const accessToken = await signAccessToken({ id: newUser.id });

        const refreshToken = await signRefreshToken({ id: newUser.id });

        return { accessToken, refreshToken, user: newUser };

    } catch (error) {
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
};

module.exports = { signupService, signinService };