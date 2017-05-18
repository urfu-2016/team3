'use strict';

const fs = require('fs');
const HttpStatus = require('http-status');
const createError = require('../utils/create-error');

module.exports = app => {
    fs.readdirSync(__dirname)
        .filter(fileName => fileName !== 'index.js')
        .forEach(routeName => require(`./${routeName}`)(app));

    app.all('*', (req, res, next) => next(createError('Page Not Found', HttpStatus.NOT_FOUND)));
};

