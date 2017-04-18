'use strict';

const auth = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');
const recaptcha = require('express-recaptcha');

module.exports = app => {
    app.get('/profile', isAuth, (req, res) => res.send('Here will be user profile page'));

    app.route('/login')
        .get(auth.loginPage)
        .post(auth.loginLocal);

    app.get('/login/vk', auth.loginVK);

    app.get('/login/twitter', auth.loginTwitter);

    app.route('/register')
        .get(recaptcha.middleware.render('registration-form', 'recaptcha-submit'), auth.registerPage)
        .post(recaptcha.middleware.verify, auth.registration);

    app.get('/logout', isAuth, auth.logout);
};

