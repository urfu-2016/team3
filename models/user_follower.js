var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var userFollowerSchema = new Schema({
    userId: {type: ObjectId, ref: 'User', index: true},
    followedUserId: {type: ObjectId, ref: 'User', index: true}
});

module.exports = mongoose.model('UserFolower', userFollowerSchema);
