'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    followed: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Follow", FollowSchema);