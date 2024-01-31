const { signupService, signinService } = require('../services/auth.service');

const signup = async (req, res, next) => {
        const { accessToken, refreshToken, user } = await signupService(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user === undefined ? null : user,
            tokens: {
                'access-token': accessToken,
                'refresh-token': refreshToken,
            }
        });
};

const signin = async (req, res, next) => {
    const { accessToken, refreshToken, user } = await signinService(req.body);
    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: user === undefined ? null : user,
        tokens: {
            'access-token': accessToken,
            'refresh-token': refreshToken
        }
    });
};

module.exports = { signup, signin };