const request = require('supertest');
const app = require('../../app');  // Import the Express app
const mongoose = require('mongoose');
const Movie = require('../models/Movie');  // Assuming movie model is in 'Movie-API/Models'

describe('Movies API', () => {
    let movieId;

    beforeAll(async () => {
        // Connect to the correct database before tests
        const dbURI = process.env.MONGODB_URL_TEST;
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    });
    
    afterAll(async () => {
        // Close the connection after tests
        await mongoose.connection.close();
    });

    // Test for creating a movie
    it('should create a new movie', async () => {
        const movieData = {
            "title": "LIon",
            "genre": "60c72b1f9f1b2c001f7fda6b",  // Example ObjectId for the Genre
            "director": "60c72b2b9f1b2c001f7fda6c",  // Example ObjectId for the Director
            "releaseYear": 2010,
            "actors": ["60c72b2b9f1b2c001f7fda6d", "60c72b2b9f1b2c001f7fda6e"] 
        };

        const res = await request(app)
            .post('/api/movies')
            .send(movieData)
            .expect(201);  // Expect HTTP Status Code 201 (Created)

        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe(movieData.title);
        expect(res.body.genre).toBe(movieData.genre);
        expect(res.body.director).toBe(movieData.director);
        expect(res.body.releaseYear).toBe(movieData.releaseYear);
        expect(res.body.actors).toEqual(expect.arrayContaining(movieData.actors));

        movieId = res.body._id;  // Save the movieId for further tests
    });

    // Test for getting all movies
    it('should retrieve all movies', async () => {
        const res = await request(app)
            .get('/api/movies')
            .expect(200);  // Expect HTTP Status Code 200 (OK)

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);  // At least 1 movie should exist
    });

    // Test for updating a movie
    it('should update an existing movie', async () => {
        const movieData = {
            title: 'Inception Updated',
            genre: 'Sci-Fi',
            director: 'Christopher Nolan',
            releaseYear: 2011,
            actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
        };

        const res = await request(app)
            .put(`/api/movies/${movieId}`)
            .send(movieData)
            .expect(200);  // Expect HTTP Status Code 200 (OK)

        expect(res.body.title).toBe(movieData.title);
        expect(res.body.releaseYear).toBe(movieData.releaseYear);
    });

    // Test for deleting a movie
    it('should delete an existing movie', async () => {
        const res = await request(app)
            .delete(`/api/movies/${movieId}`)
            .expect(200);  // Expect HTTP Status Code 200 (OK)

        expect(res.body.message).toBe('Movie deleted successfully');
    });
});
