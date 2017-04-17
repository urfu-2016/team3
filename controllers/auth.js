'use strict';

const passport = require('passport');
const User = require('../models/user');

exports.loginPage = (req, res) => res.render('login');

exports.registerPage = (req, res) => res.render('register');

exports.loginLocal = passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login?failedStrategy=local'
});

exports.registration = (req, res, next) => {
    new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).save()
        .then(() => {
            exports.loginLocal(req, res, next);
        })
        .catch(next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.loginVK = passport.authenticate('vk');

exports.loginVKCallback = passport.authenticate('vk', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login?failedStrategy=vk'
});

exports.loginTwitter = passport.authenticate('twitter');

exports.loginTwitterCallback = passport.authenticate('twitter', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login?failedStrategy=twitter'
});
