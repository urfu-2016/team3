'use strict';

const quests = require('./quests');
const flashConstants = require('../configs/flash-constants');

exports.main = quests.list;

exports.about = (req, res) => res.render('about');

exports.error = (req, res) => {
    const err = req.flash(flashConstants.ERROR)[0];
    res.status(err.status).render('error', {error: err});
};
