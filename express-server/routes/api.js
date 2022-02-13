'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbHost = 'mongodb://database:27017/AESProjectDB';

mongoose.connect(dbHost).then(() =>{
    console.log("La conexión a la base de datos de AESProject se ha realizado correctamente")
}).catch(err => console.log("La conexión a la base de datos no funciona", err));

// GET api listing.
router.get('/', (req, res) => {
    res.send('La API está okilish *_*');
});

module.exports = router;
