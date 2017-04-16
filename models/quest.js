'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const questSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    creationDate: {type: Date, index: true, default: Date.now},
    name: {
        type: String,
        index: true,
        minlength: 6,
        maxlength: 30,
        required: true
    },
    description: {
        type: String,
        minlength: 30,
        maxlength: 5000,
        required: true
    },
    published: {type: Boolean, default: false},
    likesCount: {type: Number, index: true, default: 0},
    passesCount: {type: Number, index: true, default: 0},
    passedCount: {type: Number, index: true, default: 0},
    photos: [{type: ObjectId, ref: 'Photo'}],
    comments: [{
        text: String,
        author: {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    }]
});

module.exports = mongoose.model('Quest', questSchema);
