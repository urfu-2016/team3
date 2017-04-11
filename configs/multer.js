'use strict';

const multer = require('multer');

module.exports = multer({
    limits: {
        fileSize: 15 * 1024 * 1024
    }
});
