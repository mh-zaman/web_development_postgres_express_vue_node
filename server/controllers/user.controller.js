const { getAllUsersService, getUserByIdService, updateUserService, deleteUserService } = require('../services/user.service');
const ErrorHandler = require('../middleware/error.class.js');

const getAllUsers = async (req, res, next) => {
    const users = await getAllUsersService();
    res.status(200).json({
        success: true,
        message: 'All Users',
        data: users
    });
};

const getUserById = async (req, res, next) => {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json({
        success: true,
        message: 'User found',
        data: user
    })
};

const updateUser = async (req, res, next) => {
    const { username, email, name, avatar } = req.body;
    try {
        const result = await updateUserService({
            id: req.params.id,
            username,
            email,
            name,
            avatar,
        });

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const result = await deleteUserService(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };