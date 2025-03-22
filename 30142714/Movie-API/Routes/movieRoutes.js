const express = require('express');
const router = express.Router();
const movieController = require('../Controller/movieController');

// POST a new movie
router.post('/', movieController.createMovie);

// GET all movies
router.get('/', movieController.getMovies);

// PUT (update) a movie by ID
router.put('/:id', movieController.updateMovie);

// DELETE a movie by ID
router.delete('/:id', movieController.deleteMovie);


module.exports = router;
