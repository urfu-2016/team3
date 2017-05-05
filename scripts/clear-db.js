'use strict';

process.chdir(__dirname);
const fs = require('fs');
const mongoose = require('mongoose');

require('../db/connect')()
    .then(() => mongoose.connection.db.dropDatabase())
    .catch(err => console.error(err.message, err))
    .then(() => mongoose.connection.close());
