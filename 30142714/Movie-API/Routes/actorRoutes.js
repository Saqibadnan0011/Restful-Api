const express = require('express');
const router = express.Router();
const actorController = require('../Controller/actorController');

// POST a new actor
router.post('/', actorController.createActor);

module.exports = router;
