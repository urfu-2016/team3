'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var questSchema = new Schema({
    authorId: {type: ObjectId, ref: 'User', index: true},
    creationDate: {type: Date, index: true},
    name: {type: String, index: true},
    description: String,
    likesCount: {type: Number, index: true},
    passesCount: {type: Number, index: true},
    passedCount: {type: Number, index: true},
    photoIds: [{type: ObjectId, ref: 'Photo'}]
});

module.exports = mongoose.model('Quest', questSchema);