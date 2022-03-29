"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {User} from "./user";

const ConversationSchema = Schema({
    user1: User,
    user2: User,
    created_at: Date,
});

module.exports = mongoose.model("Conversation", ConversationSchema);