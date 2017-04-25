'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SALT_WORK_FACTOR = 13;

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

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.password || !user.isModified('password')) {
        return next();
    }

    return bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(next);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isHaveAccessToQuest = function (quest) {
    return quest.author.id === this.id || quest.author.toString() === this.id || this.isAdmin;
};

module.exports = mongoose.model('User', userSchema);
