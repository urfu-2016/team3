'use strict';

const quests = require('./../controllers/quests');
const isAuth = require('../middlewares/isAuth');

module.exports = app => {
    app.route('/quests')
        .get(quests.list)
        .post(isAuth, quests.create);
    app.get('/quests/create', isAuth, quests.create);
    app.get('/quests/:id', quests.show);
    app.post('/quests/:id/publish', isAuth, quests.publish);
};

