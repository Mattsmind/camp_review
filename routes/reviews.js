const express = require('express');
const router = express.Router({ mergeParams: true });

const validateForm = require('../middleware/validateForm');
const { reviewSchema } = require('../models/reviewsValidation');

const reviews = require('../controllers/reviews');

router.post('/', validateForm(reviewSchema), reviews.createReview);

module.exports = router;