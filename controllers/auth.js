'use strict';

const passport = require('passport');
const User = require('../models/user');

const AUTHORIZATION_STRATEGY_OPTIONS = {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
};

exports.loginPage = (req, res) => res.render('authorization/login', {error: req.flash('error')});

exports.registerPage = (req, res) => res.render('authorization/registration', {
    error: req.flash('error'),
    captcha: req.recaptcha
});

exports.registration = (req, res, next) => {
    if (req.recaptcha.error) {
        switch (req.recaptcha.error) {
            case 'invalid-input-secret':
            case 'missing-input-secret':
                console.error(`reCaptcha secret key is ${req.recaptcha.error.split('-')[0]}`);
                return next(new Error('There is a problem on our side. We already knows about it. Please, try again later.'));
            case 'missing-input-response':
                console.error('User\'s reCaptcha response was lost');
                return next(new Error('There is a problem on our side. We already knows about it. Please, try again later.'));
            case 'invalid-input-response':
                req.flash('error', 'Your solution was wrong! Please, try again');
                return res.redirect('/register');
            default:
                next(new Error(`Undefined reCaptcha error: ${req.recaptcha.error}`));
        }
    }
    new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).save()
        .then(() => exports.loginLocal(req, res, next))
        .catch(next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.loginLocal = passport.authenticate('local', AUTHORIZATION_STRATEGY_OPTIONS);

exports.loginVK = passport.authenticate('vk', AUTHORIZATION_STRATEGY_OPTIONS);

exports.loginTwitter = passport.authenticate('twitter', AUTHORIZATION_STRATEGY_OPTIONS);
