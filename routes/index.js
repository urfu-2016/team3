'use strict';

const HttpStatus = require('http-status');
const fs = require('fs');

module.exports = app => {
    fs.readdirSync(__dirname)
        .filter(fileName => fileName !== 'index.js')
        .forEach(routeName => require(`./${routeName}`)(app));

    app.all('*', (req, res) => res.sendStatus(HttpStatus.NOT_FOUND));
};

