'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const env = require('../configs/env');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    likedQuests: [{type: ObjectId, ref: 'Quest', index: true}],
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
    twitterId: {type: String, index: true}
});

function createPasswordHash(password) {
    return crypto.createHash('sha512', env.HASH_SECRET)
        .update(password)
        .digest('hex');
}

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.passowrd || !user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password,
            (err, isMatch) => err ? reject(err) : resolve(isMatch));
    });
};

module.exports = mongoose.model('User', userSchema);
