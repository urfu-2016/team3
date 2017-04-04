const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(require('./connection-string'), {}, err => {
            if (err) {
                console.error('Connection to database failed!', err);
                reject(err);
            } else {
                console.info('Successfully connected to database');
                resolve();
            }
        });
    });
};
