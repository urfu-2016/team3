'use strict';

const main = require('./controllers/main');
const checkin = require('./controllers/checkin');
module.exports = app => {
    app.get('/', main);
    app.get('/checkin', checkin);
    app.all('*', (req, res) => res.sendStatus(404));
};

