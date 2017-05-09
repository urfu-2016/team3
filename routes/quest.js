'use strict';

const quests = require('./../controllers/quests');
const isAuth = require('../middlewares/isAuth');
const recaptcha = require('express-recaptcha');
const questUrls = require('../utils/url-generator').quests;

module.exports = app => {
    app.route(questUrls.root())
        .get(quests.list)
        .post(isAuth, recaptcha.middleware.verify, quests.create);
    app.get(questUrls.create(), isAuth,
        recaptcha.middleware.render, quests.create);
    app.get(questUrls.specific(), quests.show);
    app.post(questUrls.publish(), isAuth, quests.publish);
    app.post(questUrls.comment(), quests.createComment);
};

