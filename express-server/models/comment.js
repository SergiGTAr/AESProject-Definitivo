"use strict";

const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./user');
const Post = require('./post');

const CommentSchema = new Schema({
    post: Post,
    user: User,
    content: String,
    created_at: Date,
});

module.exports = mongoose.model("Comment", CommentSchema);