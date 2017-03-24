'use strict';

const main = require('./controllers/main');
const quests = require('./controllers/quests');
const photos = require('./controllers/photos');

module.exports = app => {
    app.get('/', main.main);
    app.get('/about', main.about);
    app
        .route('/quests')
        .get(quests.list)
        .post(quests.create);
    app.get('/quests/:id', quests.show);
    app.get('/quests/create', quests.create);

    app.get('/photos/:id', photos.show);
    app.post('/photos', photos.checkin);

    app.all('*', (req, res) => res.sendStatus(404));
};

