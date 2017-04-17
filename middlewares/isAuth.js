'use strict';

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.returnTo = req.url;
    res.redirect('/login');
};
