const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    likedQuests: [{type: ObjectId, ref: 'Quest', index: true}],
    name: {type: String, index: true},
    email: {type: String, unique: true},
    passwordHash: {type: String, index: true},
    passedQuests: [{type: ObjectId, ref: 'Quest', unique: true}],
    photoStatuses: [{photo: {type: ObjectId, ref: 'Photo'}, status: Boolean}]
});

module.exports = mongoose.model('User', userSchema);
