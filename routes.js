'use strict';

const main = require('./controllers/main');

const createQuest = require('./controllers/create-quest');

module.exports = app => {
    app.get('/', main);
    app.get('/create-quest', createQuest);
    app.all('*', (req, res) => res.sendStatus(404));
};

