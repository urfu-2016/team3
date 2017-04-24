'use strict';

const auth = require('../controllers/auth');
const isAuth = require('../middlewares/isAuth');
const recaptcha = require('express-recaptcha');
const userUrls = require('../utils/url-generator').users;

module.exports = app => {
    app.get(userUrls.profile(), isAuth, (req, res) => res.send('Here will be user profile page'));

    app.route(userUrls.login())
        .get(auth.loginPage)
        .post(auth.loginLocal);

    app.get(userUrls.loginVK(), auth.loginVK);

    app.get(userUrls.loginTwitter(), auth.loginTwitter);

    app.route(userUrls.register())
        .get(recaptcha.middleware.render, auth.registerPage)
        .post(recaptcha.middleware.verify, auth.registration);

    app.get(userUrls.logout(), isAuth, auth.logout);
};

