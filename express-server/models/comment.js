'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    post: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    content: String,
    created_at: Date
})

module.exports = mongoose.model("Comment", CommentSchema);