'use strict';

const quests = require('./../controllers/quests');
const isAuth = require('../middlewares/is-auth');
const isPersistent = require('../middlewares/is-persistent-user');
const recaptcha = require('express-recaptcha');
const questUrls = require('../utils/url-generator').quests;

module.exports = app => {
    app.route(questUrls.root())
        .get(quests.list)
        .post(isAuth, isPersistent, recaptcha.middleware.verify, quests.create);
    app.get(questUrls.create(), isAuth, isPersistent,
        recaptcha.middleware.render, quests.create);
    app.post(questUrls.search(), quests.search);
    app.get(questUrls.specific(), quests.show);
    app.post(questUrls.publish(), isAuth, isPersistent, quests.publish);
    app.post(questUrls.comment(), isAuth, isPersistent, quests.createComment);
};

