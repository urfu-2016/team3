'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const env = require('../configs/env');

const userSchema = new Schema({
    likedQuests: [{type: ObjectId, ref: 'Quest', index: true}],
    name: {type: String, index: true},
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
    twitterId: {type: String, index: true}
});

function createPasswordHash(password) {
    return crypto.createHash('sha512', env.HASH_SECRET)
        .update(password)
        .digest('hex');
}

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = createPasswordHash(this.password);
    }
    next();
});

userSchema.methods.checkPassword = function (password) {
    const passHash = createPasswordHash(password);
    return this.password === passHash;
};

module.exports = mongoose.model('User', userSchema);
