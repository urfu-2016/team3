'use strict';

const passport = require('passport');
const User = require('../models/user');

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.registerPage = (req, res) => {
    res.render('register');
};

exports.loginLocal = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
});

exports.registration = (req, res, next) => {
    new User({
        nickname: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).save()
        .then(user => {
            req.logIn(user, err => err ? next(err) : res.redirect('/'));
        })
        .catch(next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.loginVK = passport.authenticate('vk');

exports.loginVKCallback = passport.authenticate('vk', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
});

exports.loginTwitter = passport.authenticate('twitter');

exports.loginTwitterCallback = passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
});
