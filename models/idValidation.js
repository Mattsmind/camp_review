const Joi = require('joi');

module.exports.objectIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.length': 'Invalid Motel ID format',
        'string.hex': 'Motel ID must be a valid hex string'
    }),
    reviewId: Joi.string().hex().length(24).messages({
        'string.length': 'Invalid Review ID format',
        'string.hex': 'Review ID must be a valid hex string'
    })
}).unknown(true);