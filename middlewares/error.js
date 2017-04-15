'use strict';

const HttpStatus = require('http-status');

exports.middleware = cb => {
    return (err, req, res, next) => {
        /* eslint no-unused-vars: 0 */
        /* eslint max-params: [2, 4] */

        cb(err);
        next();
    };
};

exports.server = cb => {
    return (err, req, res, next) => {
        /* eslint no-unused-vars: 0 */
        /* eslint max-params: [2, 4] */

        cb(err);
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    };
};
