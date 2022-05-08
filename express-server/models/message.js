'use strict'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    text: String,
    viewed: String,
    created_at: String,
    sender: {type: Schema.ObjectId, ref: 'User'},
    recipient: {type: Schema.ObjectId, ref: 'User'}
});


module.exports=mongoose.model('Message', MessageSchema);