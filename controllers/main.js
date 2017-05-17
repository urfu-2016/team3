'use strict';

const HttpStatus = require('http-status');
const quests = require('./quests');
const flashConstants = require('../configs/flash-constants');

exports.main = quests.list;

exports.about = (req, res) => res.render('about');

exports.error = (req, res) => {
    try {
        const err = JSON.parse(req.flash(flashConstants.ERROR)[0]);
        res.status(err.status).render('error', {error: err});
    } catch (err) {
        res.render('error', {error: {status: HttpStatus.OK, message: 'There are no error :)'}});
    }
};
