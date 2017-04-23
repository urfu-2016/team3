'use strict';

const quests = require('./../controllers/quests');
const isAuth = require('../middlewares/isAuth');
const recaptcha = require('express-recaptcha');

module.exports = app => {
    app.route('/quests')
        .get(quests.list)
        .post(isAuth, recaptcha.middleware.verify, quests.create);
    app.get('/quests/create', isAuth,
        recaptcha.middleware.render, quests.create);
    app.get('/quests/:id', quests.show);
    app.post('/quests/:id/publish', isAuth, quests.publish);
    app.post('/quests/:id/comment', quests.createComment);
};

