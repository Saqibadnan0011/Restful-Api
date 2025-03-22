const Movie = require('../models/Movie');

// Create a new movie
exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the movie and update it
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the movie and delete it
        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
