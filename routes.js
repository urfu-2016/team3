'use strict';

const main = require('./controllers/main');
const quests = require('./controllers/quests');
const photos = require('./controllers/photos');
const auth = require('./controllers/auth');

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

    app.route('/login')
        .get(auth.loginPage)
        .post(auth.loginLocal);

    app.get('/login/vkontakte', auth.loginVK);
    app.get('/login/vkontakte/callback', auth.loginVKCallback);

    app.get('/login/twitter', auth.loginTwitter);
    app.get('/login/twitter/callback', auth.loginTwitterCallback);

    app.route('/register')
        .get(auth.registerPage)
        .post(auth.registration);

    app.get('/logout', auth.logout);

    app.all('*', (req, res) => res.sendStatus(404));
};

