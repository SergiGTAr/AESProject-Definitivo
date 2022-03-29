"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {User} from "./user.model";

const FriendSchema = Schema({
    sender: User,
    receptor: User,
    is_accepted: Boolean,
    created_at: Date,
});

module.exports = mongoose.model("Friend", FriendSchema);