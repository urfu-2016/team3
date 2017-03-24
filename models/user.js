var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema({
    likedQuests: [{type: ObjectId, ref: 'Quest', index: true}],
    name: {type: String, index: true},
    email: {type: String, unique: true},
    passwordHash: {type: String, index: true},
    passedQuests: [{type: ObjectId, ref: 'Quest', unique: true}],
    photoStatuses: [{photoId: {type: ObjectId, ref: 'Photo'}, status: Boolean}]
});

module.exports = mongoose.model('User', userSchema);
