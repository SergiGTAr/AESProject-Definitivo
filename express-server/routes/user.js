'use strict'

const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();
const md_auth = require('../middlewares/checkAuth')

api.get('/home', md_auth.ensureAuth, UserController.home);
api.get('/proves', md_auth.ensureAuth, UserController.proves);


api.post('/userbyid', md_auth.ensureAuth, UserController.getUserById);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/users', md_auth.ensureAuth, UserController.getAllUsers);
api.get('/userbyusername/:username', md_auth.ensureAuth, UserController.getUserByUsername);
api.delete('/deleteuser', md_auth.ensureAuth, UserController.deleteUser);
api.post('/updateuser', md_auth.ensureAuth, UserController.updateUser);
api.get('/counters', md_auth.ensureAuth, UserController.getCounters);


module.exports = api;