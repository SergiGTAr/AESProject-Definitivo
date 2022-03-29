"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    name: String,
    image: String,
    description: String,
    created_at: Date,
});

module.exports = mongoose.model("Team", TeamSchema);