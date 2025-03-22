const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const movieRoutes = require('./Movie-API/Routes/movieRoutes');
const directorRoutes = require('./Movie-API/Routes/directorRoutes');
const actorRoutes = require('./Movie-API/Routes/actorRoutes');
const genreRoutes = require('./Movie-API/Routes/genreRoutes');

const { generateToken } = require('./Movie-API/Middleware/auth');

const app = express();
app.use(bodyParser.json());

// Determine the MongoDB URI based on the environment
console.log('Environment:', process.env.NODE_ENV);  // This should print 'test' for testing environment

const dbURI = process.env.NODE_ENV === 'test' 

    ? process.env.MONGODB_URL_TEST  // If in test environment, use the test database
    : process.env.MONGODB_URL;      // Otherwise, use the production database

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Successfully Connected!"))
.catch(err => console.error("Got Error, Connection Failed!", err));

// Authentication Route
app.post('/login', (req, res) => {
    console.log("Login request received");
    const user = { _id: '99988' };
    const token = generateToken(user);
    res.send({ token });
});

// API Routes
app.use('/api/movies', movieRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/genres', genreRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
