'use strict';

const main = require('./controllers/main');
const quests = require('./controllers/quests');
const photos = require('./controllers/photos');
const recaptcha = require('express-recaptcha');
const upload = require('./configs/multer');

module.exports = app => {
    app.get('/', main.main);
    app.get('/about', main.about);
    app
        .route('/quests')
        .get(quests.list)
        .post(recaptcha.middleware.verify, upload.array('photo-image'), quests.create);
    app.get('/quests/create', recaptcha.middleware.render, quests.create);
    app.get('/quests/:id', quests.show);
    app.post('/photos', recaptcha.middleware.verify, photos.checkin);
    app.get('/photos/:id', recaptcha.middleware.render, photos.show);

    app.all('*', (req, res) => res.sendStatus(404));
};

