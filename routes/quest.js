'use strict';

const quests = require('./../controllers/quests');
const recaptcha = require('express-recaptcha');
const isAuth = require('../middlewares/isAuth');

module.exports = app => {
    app.route('/quests')
        .get(quests.list)
        .post(recaptcha.middleware.verify, quests.create);
    app.get('/quests/create', isAuth, recaptcha.middleware.render, quests.create);
    app.get('/quests/:id', quests.show);
    app.post('/quests/:id/publish', quests.publish);
};

