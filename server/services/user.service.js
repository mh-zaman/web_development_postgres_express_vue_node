const { getAllUsersDB, getUserByIdDB, updateUserDB, getUsername, getEmail, deleteUserDB } = require('../db/functions/user.db');
const ErrorHandler = require('../middleware/error.class.js');

async function getAllUsersService() {
    try {
        return await getAllUsersDB();
    } catch (error) {
        console.error(error);
        throw new ErrorHandler(error.statusCode || 500, error.message);
    }
};

async function getUserByIdService(id) {
    try {
        const user = await getUserByIdDB(id);
        if (!user) {
            throw new ErrorHandler(404, 'No user found by this id');
        }
        return user;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

async function updateUserService(user) {
    const { id, username, email, name, avatar } = user;
    const errors = {};

    try {
        const getUser = await getUserByIdDB(id);
        if (!user) {
            throw new ErrorHandler(404, 'No user found by this id');
        }

        const findByUsername = await getUsername(username);
        const findByEmail = await getEmail(email);

        const emailChanged = email && getUser.email.toLowerCase() !== email.toLowerCase();
        const usernameChanged = username && getUser.username.toLowerCase() !== username.toLowerCase();

        if (emailChanged && typeof findByEmail === "object") errors["email"] = "Email already taken";

        if (usernameChanged && typeof findByUsername === "object") errors["username"] = "Username already taken";

        if (Object.keys(errors).length > 0) throw new ErrorHandler(403, errors);
    
        if (!user.username) user.username = getUser.username;
        if (!user.email) user.email = getUser.email;
        if (!user.name) user.name = getUser.name;
        if (!user.avatar) user.avatar = getUser.avatar;

        return await updateUserDB(user);

    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }

};

async function deleteUserService(id) {
    try {
        const user = await deleteUserDB(id);
        if (!user) throw new ErrorHandler(404, "User not found");
        return user;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

module.exports = { getAllUsersService, getUserByIdService, updateUserService, deleteUserService };