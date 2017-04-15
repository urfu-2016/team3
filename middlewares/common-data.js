'use strict';

module.exports = (req, res, next) => {
    res.locals.title = 'PhotoQuests';
    if (req.user) {
        res.locals.username = req.user.name;
    }
    if (process.env.NODE_ENV === 'production') {
        res.locals.staticBasePath = '//team3.surge.sh';
    }

    next();
};
