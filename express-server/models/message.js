"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {User} from "./user.model";
import {Conversation} from "./conversation.model";
import {Team} from "./team.model";

const MessageSchema = Schema({
    content: String,
    user: User,
    conversation: Conversation,
    created_at: Date,
    image: String,
    team: Team,
});

module.exports = mongoose.model("Message", MessageSchema);