const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/photo-quest')
            .then(resolve, reject);
    });
};
