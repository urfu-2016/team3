'use strict';

module.exports = (req, res, next) => {
    res.locals.title = 'PhotoQuests';

    if (process.env.NODE_ENV === 'production') {
        res.locals.staticBasePath = '//team3.surge.sh';
    }

    next();
};
