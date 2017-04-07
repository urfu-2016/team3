'use strict';

const main = require('./controllers/main');
const quests = require('./controllers/quests');
const photos = require('./controllers/photos');
const recaptcha = require('express-recaptcha');
const upload = require('./configs/multer');

module.exports = app => {
    app.get('/', main.main);
    app.get('/about', main.about);

    app.route('/quests')
        .get(quests.list)
        .post(recaptcha.middleware.verify, quests.create);
    app.get('/quests/create', recaptcha.middleware.render, quests.create);
    app.post('/quests/publish', quests.publish);
    app.get('/quests/:id', quests.show);
    app.post('/photos', upload.single('image'), photos.upload);
    app.get('/photos/image', photos.image);
    app.post('/photos/checkin', recaptcha.middleware.verify, photos.checkin);
    app.get('/photos/:id', recaptcha.middleware.render, photos.show);

    app.all('*', (req, res) => res.status(404).render('404'));
};

