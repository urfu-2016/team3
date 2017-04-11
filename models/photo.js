'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const photoSchema = new Schema({
    image: {type: Buffer, contentType: String},
    location: {
        longitude: {
            type: Number,
            index: true,
            required: true
        },
        latitude: {
            type: Number,
            index: true,
            required: true
        }
    },
    description: {type: String, default: ''},
    quest: {
        type: ObjectId,
        ref: 'Quest',
        index: true,
        required: true
    },
    successfulTriesCount: {type: Number, default: 0},
    failedTriesCount: {type: Number, default: 0}
});

module.exports = mongoose.model('Photo', photoSchema);
