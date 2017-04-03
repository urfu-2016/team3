'use strict';

const mongoose = require('./connection');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const photoSchema = new Schema({
    url: String,
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
    questId: {
        type: ObjectId,
        ref: 'Quest',
        index: true,
        required: true
    },
    successfulTriesCount: {type: Number, default: 0},
    failedTriesCount: {type: Number, default: 0}
});

module.exports = mongoose.model('Photo', photoSchema);
