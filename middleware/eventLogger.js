const { getTimestamp } = require('../utils/logStyles');

const requestLogger = function (req, res, next) {
    const timestamp = getTimestamp();
    console.log(`${`[${timestamp.label}][${req.method.label}]`.labelBox} ${`\t❱❱❱`.arrow} ${req.url}`);
    next();
}

const errorLogger = function (err, req, res, next) {
    const timestamp = getTimestamp();

    console.log(
        `${`[${timestamp.label}][ERROR]`.labelBox} ${`\t💥💥💥`.arrow} ${req.method} ${req.url} ➔ ${err.message}`
    );

    if (err.stack) {
        console.error(err.stack);
    }

    next(err);
};

module.exports = {
    requestLogger,
    errorLogger
};