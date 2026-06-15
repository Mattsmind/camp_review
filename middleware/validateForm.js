const AppError = require('../utils/AppError');

const validateForm = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            const msg = error.details.map(el => el.message).join(', ');
            return next(new AppError(msg, 400));
        } else {
            next();
        }
    };
};

module.exports = validateForm;