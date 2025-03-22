const Actor = require('../models/Actor');

exports.createActor = async (req, res) => {
    const { name, dob } = req.body;
    try {
        const newActor = new Actor({ name, dob });
        await newActor.save();
        res.status(201).send(newActor);
    } catch (err) {
        res.status(400).send(err);
    }
};
