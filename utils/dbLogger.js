const { getTimestamp } = require('./logStyles');

const dbLoggingPlugin = function (schema) {
    schema.pre(/^(find|update|delete)/, function(next) {
        const timestamp = getTimestamp();
        const dbMethod = this.op.toUpperCase();
        const dbResource = this.model.modelName;

        console.log(`${`[${timestamp.label}][${dbMethod.label}]`.labelBox} ${`\t❱❱❱`.arrow} ${dbResource}`);
    });
    
    schema.pre('save', function() {
        const timestamp = getTimestamp();
        const dbMethod = this.isNew ? 'CREATE' : 'SAVE'
        const dbResource = this.constructor.modelName;

        console.log(`${`[${timestamp.label}][${dbMethod.label}]`.labelBox} ${`\t❱❱❱`.arrow} ${dbResource}`);      
    });
    
}

module.exports = dbLoggingPlugin;