const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function () {
    let connectionString = 'mongodb://localhost/photo-quest';
    if (process.env.NODE_ENV === 'production') {
        connectionString = process.env.MONGODB_URI;
    }

    mongoose.connect(connectionString, {}, err => {
        if (err) {
            console.error('CONNECTION ERROR!', err);
        } else {
            console.info('Connected to db');
        }
    });
};
