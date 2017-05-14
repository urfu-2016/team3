'use strict';

const fs = require('fs');

module.exports = app => {
    fs.readdirSync(__dirname)
        .filter(fileName => fileName !== 'index.js')
        .forEach(routeName => require(`./${routeName}`)(app));

    app.all('*', (req, res, next) => {
        const err = new Error('Page Not Found');
        err.status = 404;
        next(err);
    });
};

