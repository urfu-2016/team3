'use strict';

const Comment = require('../models/comment');

module.exports = {
    list: (req, res) => {
        Comment.find((err, comments) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting comment.'
                });
            }
            return res.json(comments);
        });
    },

    create: (req, res) => {
        const comment = new Comment({
            comment: req.body.comment,
            author: req.body.author.id,
            parentComment: req.body.parentComment.id
        });

        comment.save((err, comment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving comment',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: comment._id
            });
        });
    },

    remove: (req, res) => {
        Comment.findByIdAndRemove(req.params.id, (err, comment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting comment.'
                });
            }
            return res.json(comment);
        });
    }
};
