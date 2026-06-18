const Joi = require('joi');

const motelSchema = Joi.object({
    motel: Joi.object({
        title: Joi.string().required().min(4),
        price: Joi.number().required().min(0.01),
        image: Joi.string().uri().allow(''), 
        description: Joi.string().required().min(10),
        location: Joi.string().required()
    }).required()
});

const objectIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

module.exports = { 
    motelSchema,
    objectIdSchema
};