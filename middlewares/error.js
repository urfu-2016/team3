'use strict';

const HttpStatus = require('http-status');

exports.middleware = cb => {
    return (err, req, res, next) => {
        /* eslint no-unused-vars: 0 */
        /* eslint max-params: [2, 4] */
        cb(err);
        next(err);
    };
};

exports.server = cb => {
    return (err, req, res, next) => {
        /* eslint no-unused-vars: 0 */
        /* eslint max-params: [2, 4] */
        cb(err);
        if (!('status' in err)) {
            err = new Error(HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]);
            err.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        err.status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        err.message = err.message || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
        res.status(err.status).render('error', {error: err});
    };
};
