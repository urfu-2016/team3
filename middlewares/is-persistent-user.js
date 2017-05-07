'use strict';

const HttpStatus = require('http-status');

module.exports = (req, res, next) => {
    if (req.user.isPersistentUser()) {
        return next();
    }

    const error = new Error('Please, confirm your account');
    error.status = HttpStatus.FORBIDDEN;
    next(error);
};
