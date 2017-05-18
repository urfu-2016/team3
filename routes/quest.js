'use strict';

const quests = require('./../controllers/quests');
const isAuth = require('../middlewares/is-auth');
const isPersistent = require('../middlewares/is-persistent-user');
const recaptcha = require('express-recaptcha');
const questUrls = require('../utils/url-generator').quests;
const recaptchaErrorHandler = require('../middlewares/recaptcha-error-handler');

module.exports = app => {
    app.route(questUrls.root())
        .get(quests.list)
        .post(isAuth, isPersistent, recaptcha.middleware.verify, recaptchaErrorHandler, quests.create);
    app.get(questUrls.create(), isAuth, isPersistent,
        recaptcha.middleware.render, quests.create);
    app.post(questUrls.search(), quests.search);
    app.get(questUrls.specific(), quests.show);
    app.post(questUrls.publish(), isAuth, isPersistent, quests.publish);
    app.post(questUrls.remove(), isAuth, isPersistent, quests.remove);
    app.post(questUrls.edit(), isAuth, isPersistent, quests.edit);
    app.post(questUrls.like(), isAuth, isPersistent, quests.like);
    app.post(questUrls.follow(), isAuth, isPersistent, quests.follow);
    app.post(questUrls.comment(), isAuth, isPersistent, quests.createComment);
};

