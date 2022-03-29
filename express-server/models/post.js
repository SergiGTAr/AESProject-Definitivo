"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {User} from "./user.model";

const PostSchema = Schema({
    content: String,
    user: User,
    created_at: Date,
    image: String,
    likes: Number,
    category: String,
});

module.exports = mongoose.model("Post", PostSchema);