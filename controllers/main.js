'use strict';

const quests = require('./quests');

exports.main = quests.list;

exports.about = (req, res) => res.render('about');
