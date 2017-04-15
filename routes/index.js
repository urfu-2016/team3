'use strict';

const HttpStatus = require('http-status');

module.exports = app => {
    ['common', 'user', 'quest', 'photo'].forEach(routeName => require(`./${routeName}`)(app));

    app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND).render('404'));
};

