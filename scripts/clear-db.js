'use strict';

process.chdir(__dirname);
const mongoose = require('mongoose');

require('../db/connect')()
    .then(() => mongoose.connection.dropDatabase())
    .catch(err => console.error(err.message, err))
    .then(() => mongoose.connection.close());
