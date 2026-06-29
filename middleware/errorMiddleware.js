const AppError = require('../utils/AppError');

const handleCastErrorDB = (err) => {
    return new AppError(`Invalid ${err.path}: ${err.value}.`, 400, '/motels');
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(`Duplicate field value: ${value}. Please use another value!`, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(errItem => errItem.message);
    return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = err;
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    if (error.redirectUrl) {
        req.flash('error', error.message);
        return res.redirect(error.redirectUrl);
    }

    const currentEnv = (process.env.NODE_ENV || 'production').toLowerCase().trim();
    const isDev = currentEnv === 'development' || currentEnv === 'dev';

    if (isDev) {
        return res.status(error.statusCode).render('error', {
            pageTitle: `Error ${error.statusCode} (DEV)`,
            statusCode: error.statusCode,
            message: error.message || 'Something went wrong.',
            stack: error.stack,
            isDev
        });
    }

    const safeMessage = error.statusCode === 500
        ? 'An unexpected internal server error occurred.'
        : error.message;

        res.status(error.statusCode).render('error', {
        pageTitle: 'Encountered an Error',
        statusCode: error.statusCode,
        message: safeMessage,
        stack: null,
        isDev
    });
}