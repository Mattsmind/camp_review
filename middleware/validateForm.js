const AppError = require('../utils/AppError');

const validateForm = (schema, source='body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[source]);

        if (error) {
            const msg = error.details.map(el => el.message).join(', ');
            return next(new AppError(msg, 400));
        } else {
            next();
        }
    };
};

module.exports = validateForm;