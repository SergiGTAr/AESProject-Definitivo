'use strict'

const express = require('express');
const PostController = require('../controllers/post');
const api = express.Router();
const md_auth = require('../middlewares/checkAuth');

api.get('/provesPost', md_auth.ensureAuth, PostController.provesPost);
api.post('/post', md_auth.ensureAuth, PostController.savePost);
api.get('/postsFollows/:page?', md_auth.ensureAuth, PostController.getPosts);
api.get('/post/:id', md_auth.ensureAuth, PostController.getPost);
api.delete('/post/:id', md_auth.ensureAuth, PostController.deletePost);
api.get('/postsPropis/:id', md_auth.ensureAuth, PostController.getOwnPosts);
api.get('/allposts', md_auth.ensureAuth, PostController.getAllPosts);

module.exports = api;