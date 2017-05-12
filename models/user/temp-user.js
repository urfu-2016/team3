'use strict';

const bcrypt = require('bcrypt');
const Schema = require('mongoose').Schema;

const SALT_WORK_FACTOR = 13;

const tempUserSchemaObject = Object.assign(
    Object.assign({}, require('./user-schema-object')),
    {
        GENERATED_VERIFYING_URL: String,
        createdAt: {
            type: Date,
            expires: 24 * 60 * 60,
            default: Date.now
        }
    }
);

const tempUserSchema = new Schema(tempUserSchemaObject);

tempUserSchema.pre('save', function (next) {
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
require('./configure-user-schema')(tempUserSchema);

module.exports = require('mongoose').model('TempUser', tempUserSchema);
