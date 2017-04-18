'use strict';

const passport = require('passport');
const User = require('../models/user');

const AUTHORIZATION_STRATEGY_OPTIONS = {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
};

exports.loginPage = (req, res) => res.render('authorization/login', {error: req.flash('error')});

exports.registerPage = (req, res) => res.render('authorization/registration', {error: req.flash('error')});

exports.registration = (req, res, next) =>
    new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).save()
        .then(() => exports.loginLocal(req, res, next))
        .catch(next);

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.loginLocal = passport.authenticate('local', AUTHORIZATION_STRATEGY_OPTIONS);

exports.loginVK = passport.authenticate('vk', AUTHORIZATION_STRATEGY_OPTIONS);

exports.loginTwitter = passport.authenticate('twitter', AUTHORIZATION_STRATEGY_OPTIONS);
