'use strict';

const HttpStatus = require('http-status');
const flashConstants = require('../configs/flash-constants');
const urls = require('../utils/url-generator');

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
        if (req.method === 'POST') {
            const {message, status} = err;
            req.flash(flashConstants.ERROR, JSON.stringify({message, status}));
            return res.redirect(urls.common.error());
        }
        res.status(err.status).render('error', {error: err});
    };
};
