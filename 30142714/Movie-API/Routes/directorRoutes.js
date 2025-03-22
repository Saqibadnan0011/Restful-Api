const express = require('express');
const router = express.Router();
const directorController = require('../Controller/directorController');

// POST a new director
router.post('/', directorController.createDirector);

module.exports = router;
