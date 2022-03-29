"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {User} from "./user";
import {Post} from "./post";

const CommentSchema = Schema({
    post: Post,
    user: User,
    content: String,
    created_at: Date,
});

module.exports = mongoose.model("Comment", CommentSchema);