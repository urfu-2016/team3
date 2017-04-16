'use strict';

const quests = require('./../controllers/quests');
const recaptcha = require('express-recaptcha');

module.exports = app => {
    app.route('/quests')
        .get(quests.list)
        .post(recaptcha.middleware.verify, quests.create);
    app.get('/quests/create', recaptcha.middleware.render, quests.create);
    app.get('/quests/:id', quests.show);
    app.post('/quests/:id/publish', quests.publish);
    app.post('/quests/:id/comment', quests.createComment);
};

