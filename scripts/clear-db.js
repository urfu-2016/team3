'use strict';

process.chdir(__dirname);
const fs = require('fs');
const mongoose = require('mongoose');

const models = fs.readdirSync('../models')
    .map(file => require(`../models/${file}`));

require('../db/connect')()
    .then(() => Promise.all(
            models.map(model => model.remove({}).exec())
        ))
    .then(() => {
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err.message, err);
        mongoose.connection.close();
    });

