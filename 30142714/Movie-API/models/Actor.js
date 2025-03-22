const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('Actor', actorSchema);
