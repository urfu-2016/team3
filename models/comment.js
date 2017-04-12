const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new Schema({
    comment: String,
    authorId: {
        type: ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    parentCommetId: {
        type: ObjectId,
        ref: 'Comment',
        required: false
    }
});

module.exports = mongoose.model('Comment', commentSchema);
