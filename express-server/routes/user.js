'use strict'

const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();
const md_auth = require('../middlewares/checkAuth')

api.get('/home', md_auth.ensureAuth, UserController.home);
api.get('/proves', md_auth.ensureAuth, UserController.proves);


api.get('/userbyid/:id', md_auth.ensureAuth, UserController.getUserById);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/users', md_auth.ensureAuth, UserController.getAllUsers);
api.get('/userbyusername/:username', md_auth.ensureAuth, UserController.getUserByUsername);
api.delete('/deleteuser', md_auth.ensureAuth, UserController.deleteUser);
api.post('/updateuser', md_auth.ensureAuth, UserController.updateUser);
api.get('/counters', md_auth.ensureAuth, UserController.getCounters);
api.post('/updatenamesurname', md_auth.ensureAuth, UserController.updateNameSurname);
api.post('/updatepassword', md_auth.ensureAuth, UserController.updatePassword);
api.post('/updatebiobirth', md_auth.ensureAuth, UserController.updateBioBirth);

api.post('/newfollow', md_auth.ensureAuth, UserController.newfollow);
api.get('/followerscount', md_auth.ensureAuth, UserController.followers_count);
api.get('/followingcount', md_auth.ensureAuth, UserController.following_count);


module.exports = api;