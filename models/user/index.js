'use strict';

const Schema = require('mongoose').Schema;
const generateAvatar = require('../../utils/generate-avatar');

const userSchema = new Schema(require('./user-schema-object'));

userSchema.pre('save', function (next) {
    if (!this.avatar) {
        this.avatar = generateAvatar(this.email);
    }
    next();
});

require('./configure-user-schema')(userSchema);

module.exports = require('mongoose').model('User', userSchema);
