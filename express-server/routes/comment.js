'use strict'

const express = require('express');
const CommentController = require('../controllers/comment');
const api = express.Router();
const md_auth = require('../middlewares/checkAuth')

api.get('/provesComment', md_auth.ensureAuth, CommentController.provesComment);
api.get('/getAllComments', md_auth.ensureAuth, CommentController.getAllComments);
api.get('/getCommentsByPost/:id', md_auth.ensureAuth, CommentController.getCommentsByPost);
api.delete('/deleteComment', md_auth.ensureAuth, CommentController.deleteComment);
api.post('/saveComment', md_auth.ensureAuth, CommentController.saveComment);

module.exports = api;