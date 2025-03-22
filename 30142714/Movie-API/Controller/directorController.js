const Director = require('../models/Director');

exports.createDirector = async (req, res) => {
    const { name, dob } = req.body;
    try {
        const newDirector = new Director({ name, dob });
        await newDirector.save();
        res.status(201).send(newDirector);
    } catch (err) {
        res.status(400).send(err);
    }
};
