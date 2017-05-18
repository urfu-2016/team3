'use strict';

const ObjectId = require('mongoose').Schema.Types.ObjectId;

module.exports = {
    likedQuests: [{type: ObjectId, ref: 'Quest', index: true}],
    passingQuests: [{type: ObjectId, ref: 'Quest', index: true}],
    name: {
        type: String,
        index: true,
        required: true
    },
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    password: String,
    passedQuests: [{
        type: ObjectId,
        ref: 'Quest',
        unique: true
    }],
    photoStatuses: [{
        photo: {
            type: ObjectId,
            ref: 'Photo',
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    }],
    isAdmin: {type: Boolean, default: false},
    vkId: {type: String, index: true},
    twitterId: {type: String, index: true},
    avatar: {type: String},

    loginAttempts: {type: Number, required: true, default: 0},
    lockUntil: {type: Number}
};
