'use strict';

const main = require('./../controllers/main');

module.exports = app => {
    app.get('/', main.main);
    app.get('/about', main.about);
};
