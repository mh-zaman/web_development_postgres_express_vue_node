const handleErrors = (err, req, res, next) => {
    const { statusCode, message } = err;
    console.log('This is Error ', err);
    res.status(statusCode || 500).json({
        success: false,
        statusCode: statusCode || 500,
        message: statusCode === 500 ? 'Internal Server Error' : message
    });
    next();
};

module.exports =  handleErrors;