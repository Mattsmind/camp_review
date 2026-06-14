const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

router.route('/')
    .get(campgrounds.index)
    .post(campgrounds.createCampground);

router.get('/new', campgrounds.renderNewForm);

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(campgrounds.updateCampground)
    .delete(campgrounds.deleteCampground);

router.get('/:id/edit', campgrounds.renderEditForm);

module.exports = router;