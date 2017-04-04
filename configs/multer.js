'use strict';

const crypto = require('crypto');
const multer = require('multer');
const gridFsStorage = require('multer-gridfs-storage')({
    url: require('./db/connection-string'),
    filename: function(req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            cb(err, err ? undefined : raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

module.exports = multer({storage: gridFsStorage});
