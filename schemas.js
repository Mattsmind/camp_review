const Joi = require('joi');

const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().min(4),
        price: Joi.number().required().min(0.01),
        image: Joi.string().uri().allow(''), 
        description: Joi.string().required().min(10),
        location: Joi.string().required()
    }).required()
});

module.exports = { campgroundSchema };