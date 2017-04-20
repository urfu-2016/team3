'use strict';

const mongoose = require('mongoose');
const env = require('../configs/env');

mongoose.Promise = global.Promise;

module.exports = () => Promise.resolve(mongoose.connect(env.MONGODB_URI));
