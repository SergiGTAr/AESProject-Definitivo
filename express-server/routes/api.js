const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbHost = 'mongodb://database/AESProject-Angular';

mongoose.connect(dbHost);

// GET api listing.
router.get('/', (req, res) => {
    res.send('La API está okilish *_*');
});

module.exports = router;
