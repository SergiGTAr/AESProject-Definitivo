'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/home', UserController.home);

api.get('/proves', UserController.proves);

api.post('/register', UserController.saveUser)

module.exports = api;