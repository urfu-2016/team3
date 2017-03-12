'use strict';

const main = require('./controllers/main');

module.exports = (app) => {
    app.get('/', main);
    app.all('*', (req, res) => res.sendStatus(404))
};
