const express = require('express');
const router = express.Router({ mergeParams: true });

const validateForm = require('../middleware/validateForm');
const { reviewSchema } = require('../models/reviewsValidation');
const { objectIdSchema } = require('../models/idValidation');

const reviews = require('../controllers/reviews');

router.route('/')
    .post(validateForm(reviewSchema), reviews.createReview);

router.route('/:reviewId')
    .delete(validateForm(objectIdSchema, 'params'), reviews.deleteReview)

module.exports = router;