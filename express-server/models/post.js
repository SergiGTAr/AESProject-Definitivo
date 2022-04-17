'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./user');

const PostSchema = new Schema({
        content: String,
        user: Schema.Types.ObjectId,
        created_at: Date,
        image: String,
        likes: Number,
        category: String,
    }
)

module.exports = mongoose.model("Post", PostSchema);