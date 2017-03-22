'use strict';

const main = require('./controllers/main');
const registration = require('./controllers/registration');
module.exports = app => {
    app.get('/', main);
    app.get('/register', registration);
    app.all('*', (req, res) => res.sendStatus(404));
};

