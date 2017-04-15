const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => Promise.resolve(mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/photo-quest'));
