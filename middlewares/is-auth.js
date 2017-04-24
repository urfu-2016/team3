'use strict';

const userUrls = require('../utils/url-generator').users;

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    if (req.method === 'GET') {
        req.session.returnTo = req.url;
    }
    res.redirect(userUrls.login());
};
