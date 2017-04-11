const mongoose = require('mongoose');
const mongoosemulate = require('../libs/mongoosemulate');

mongoose.Promise = Promise;

module.exports = function () {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/photo-quest', {}, err => {
        if (err) {
            console.error('CONNECTION ERROR!', err.message);
            mongoosemulate(mongoose);
        } else {
            console.info('Connected to db');
        }
    });
};
