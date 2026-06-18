const express = require('express');
const router = express.Router();
const motels = require('../controllers/motels');

const validateForm = require('../middleware/validateForm');
const { motelSchema, objectIdSchema } = require('../validationSchemas');

router.route('/')
    .get(motels.index)
    .post(validateForm(motelSchema), motels.createMotel);

router.get('/new', motels.renderNewForm);

router.route('/:id')
    .get(validateForm(objectIdSchema, 'params'), motels.showMotel)
    .put(validateForm(objectIdSchema, 'params'), validateForm(motelSchema), motels.updateMotel)
    .delete(validateForm(objectIdSchema, 'params'), motels.deleteMotel);

router.get('/:id/edit', validateForm(objectIdSchema, 'params'), motels.renderEditForm);

module.exports = router;