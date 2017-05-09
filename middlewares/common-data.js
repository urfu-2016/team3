'use strict';

const env = require('../configs/env');

module.exports = (req, res, next) => {
    res.locals.title = 'PhotoQuests';
    if (req.user) {
        res.locals.user = req.user;
    }
    res.locals.csrfToken = req.csrfToken();
    res.locals.csrfHiddenInput = `<input type="hidden" name="_csrf" value="${res.locals.csrfToken}">`;
    if (env.NODE_ENV === 'production') {
        res.locals.staticBasePath = '//team3.surge.sh';
    }

    next();
};
