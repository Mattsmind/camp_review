const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

const validateForm = require('../middleware/validateForm');
const { campgroundSchema } = require('../schemas');

router.route('/')
    .get(campgrounds.index)
    .post(validateForm(campgroundSchema), campgrounds.createCampground);

router.get('/new', campgrounds.renderNewForm);

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(validateForm(campgroundSchema), campgrounds.updateCampground)
    .delete(campgrounds.deleteCampground);

router.get('/:id/edit', campgrounds.renderEditForm);

module.exports = router;