"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");

const PostSchema = Schema({
    content: String,
    user: User,
    created_at: Date,
    image: String,
    likes: Number,
    category: String,
});

module.exports = mongoose.model("Post", PostSchema);