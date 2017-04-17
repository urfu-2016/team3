'use strict';

const auth = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');

module.exports = app => {
    app.get('/profile', isAuth, (req, res) => res.send('Here will be user profile page'));

    app.route('/login')
        .get(auth.loginPage)
        .post(auth.loginLocal);

    app.get('/login/vk', auth.loginVK);
    app.get('/login/vk/callback', auth.loginVKCallback);

    app.get('/login/twitter', auth.loginTwitter);
    app.get('/login/twitter/callback', auth.loginTwitterCallback);

    app.route('/register')
        .get(auth.registerPage)
        .post(auth.registration);

    app.get('/logout', isAuth, auth.logout);
};

