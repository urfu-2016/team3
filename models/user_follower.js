const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userFollowerSchema = new Schema({
    user: {type: ObjectId, ref: 'User', index: true},
    followedUser: {type: ObjectId, ref: 'User', index: true}
});

module.exports = mongoose.model('UserFollower', userFollowerSchema);
