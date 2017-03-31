'use strict';

const quests = require('./quests');

exports.main = quests.list;

exports.about = (res, req) => {
    /* eslint no-unused-vars: 0 */
    res.render('about');
};
