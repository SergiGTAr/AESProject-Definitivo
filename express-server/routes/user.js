'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

api.get('/home', UserController.home);

api.get('/proves', UserController.proves);

api.get('/usuariperid',UserController.getUserById);

api.post('/register', UserController.saveUser);

api.post('/login', UserController.loginUser);

api.post('/usuaris', UserController.getAllUsers);

api.post('/usuariperusername', UserController.getUserByUsername);

api.post('/eliminarusuari', UserController.deleteUser);

api.post('/actualitzarusuari', UserController.updateUser);

module.exports = api;