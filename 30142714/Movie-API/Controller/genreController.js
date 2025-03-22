const Genre = require('../models/Genre');

exports.createGenre = async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = new Genre({ name });
        await newGenre.save();
        res.status(201).send(newGenre);
    } catch (err) {
        res.status(400).send(err);
    }
};
