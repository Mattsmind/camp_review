const { getTimestamp } = require('../utils/logStyles');

const eventLogger = function (req, res, next) {
    const timestamp = getTimestamp();
    console.log(`${`[${timestamp.label}][${req.method.label}]`.labelBox} ${`\t❱❱❱`.arrow} ${req.url}`);
    next();
}

module.exports = eventLogger;