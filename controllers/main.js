'use strict';

const quests = require('./quests');

exports.main = quests.list;

exports.about = (res, req) => {
    res.render('about');
};
