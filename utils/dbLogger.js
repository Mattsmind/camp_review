const { getTimestamp } = require('./logStyles');

const dbLogger = function (dbMethod, dbResource) {
    const timestamp = getTimestamp();
    console.log(`${`[${timestamp.label}][${dbMethod.label}]`.labelBox} ${`\t❱❱❱`.arrow} ${dbResource}`);

}

module.exports = dbLogger;