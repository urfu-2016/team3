const Comment = require('../../models/comment');
const User = require('../../models/user');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: comment', () => {
    beforeEach(() => Comment.remove({}).exec());
    before(() => require('../../models/connection')());
    after(() =>
        Comment.remove({}).exec()
            .then(() => mongoose.connection.close())
            .catch(() => mongoose.connection.close()));
    it('save comment', () => {
        const comment = new Comment({
            comment: 'Это комментарий!',
            author: new User({})
        });

        return comment.save()
            .then(savedComment => assert.equal(savedComment.comment, comment.comment));
    });
});

