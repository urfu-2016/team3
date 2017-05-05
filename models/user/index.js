'use strict';

const Schema = require('mongoose').Schema;

const userSchema = new Schema(require('./user-schema-object'));
require('./configure-user-schema')(userSchema);

module.exports = require('mongoose').model('User', userSchema);
