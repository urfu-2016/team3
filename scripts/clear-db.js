'use strict';

process.chdir(__dirname);
const fs = require('fs');
const mongoose = require('mongoose');

const models = fs.readdirSync('../models')
    .map(file => require(`../models/${file}`));

require('../db/connect')()
    .then(() => {
        return Promise.all([
            models.map(model => {
                return model.remove({}).exec();
            })
        ]);
    })
    .then(() => {
        mongoose.connection.close();
    });
