const AppError = require('../utils/AppError');

const handleCastErrorDB = (err) => {
    return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(`Duplicate field value: ${value}. Please use another value!`, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(errItem = errItem.message);
    return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = { ...err, message: err.message, name: err.name, code: err.code };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message || 'Something went wrong.',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}