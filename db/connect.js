const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(require('./connection-string'))
            .then(resolve, reject);
    });
};
