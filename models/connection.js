const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/photo-quest', err => {
    if (err) {
        console.error('CONNECTION ERROR!', err);
    } else {
        console.info('Connected to db');
    }
});

module.exports = mongoose;
