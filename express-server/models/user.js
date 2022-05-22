"use strict";

const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  sex: String,
  username: String,
  email: String,
  password: String,
  role: String,
  image: String,
  following: [String],
  bio: String,
  birth: Date
});

module.exports = mongoose.model("User", UserSchema);




