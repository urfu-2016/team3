'use strict';

const main = require('./controllers/main');
const registration = require('./controllers/registration');
const login = require('./controllers/login');
module.exports = app => {
    app.get('/', main);
    app.get('/register', registration);
    app.get('/login', login);
    app.all('*', (req, res) => res.sendStatus(404));
};

