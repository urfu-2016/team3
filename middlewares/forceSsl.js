'use strict';

module.exports = (req, res, next) => {
    console.info(req.header('x-forwarded-proto'));
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url()}`)
    } else {
        next();
    }
};
