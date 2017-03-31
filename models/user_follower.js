const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userFollowerSchema = new Schema({
    userId: {type: ObjectId, ref: 'User', index: true},
    followedUserId: {type: ObjectId, ref: 'User', index: true}
});

module.exports = mongoose.model('UserFolower', userFollowerSchema);
