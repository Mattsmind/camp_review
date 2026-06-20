const Joi = require('joi');

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required().min(4),
        rating: Joi.number().required().min(0).max(5)
    }).required()
});

const objectIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

module.exports = { 
    reviewSchema,
    objectIdSchema
};