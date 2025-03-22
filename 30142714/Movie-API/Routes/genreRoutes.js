const express = require('express');
const router = express.Router();
const genreController = require('../Controller/genreController');

// POST a new genre
router.post('/', genreController.createGenre);

module.exports = router;
