"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {User} from "./user";

const ProfileSchema = Schema({
    birth: Date,
    gender: String,
    location: String,
    image: String,
    image_header: String,
    bio: String,
    address: String,
    phone: Number,
    user: User,
    privacity: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);