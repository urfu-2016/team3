'use strict';

const passport = require('passport');
const User = require('../models/user');
const urls = require('../utils/url-generator');
const nev = require('../configs/nev');
const extractDomain = require('../utils/extract-domain');

const AUTHORIZATION_STRATEGY_OPTIONS = {
    successReturnToOrRedirect: urls.common.main(),
    failureRedirect: urls.users.login(),
    failureFlash: true
};

exports.loginPage = (req, res) => res.render('authorization/login', {error: req.flash('error')});

exports.registerPage = (req, res) => res.render('authorization/registration', {
    error: req.flash('error'),
    recaptcha: req.recaptcha
});

exports.emailVerification = (req, res, next) =>
    nev.confirmTempUser(req.params.id, (err, user) => {
        if (err) {
            next(err);
        }

        if (user) {
            res.redirect(urls.common.main());
        } else {
            req.flash('error', 'Your account was expired. Please, start again');
            res.redirect(urls.users.register());
        }
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
    const user = new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    nev.configure({verificationURL: `${extractDomain(req)}/email-verification/\${URL}`}, () => {});
    nev.createTempUser(user, (err, existingPersistentUser, newTempUser) => {
        if (err) {
            return next(new Error('Creating temp user failed'));
        }

        if (existingPersistentUser) {
            return next(new Error('You have already signed up and confirmed your account. Did you forget your password?'));
        }

        if (newTempUser) {
            const URL = newTempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(newTempUser.email, URL, err => {
                if (err) {
                    console.error(err.message, err);
                    return next(new Error('Sending verification email failed'));
                }
                req.flash('registrationMessage', 'An email has been sent to you. Please check it to verify your account.');
                return exports.loginLocal(req, res, next);
            });
        } else {
            next(new Error('You have already signed up. Please check your email to verify your account.'));
        }
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect(urls.common.main());
};

exports.loginLocal = passport.authenticate('local', AUTHORIZATION_STRATEGY_OPTIONS);

exports.loginVK = passport.authenticate('vk', AUTHORIZATION_STRATEGY_OPTIONS);

exports.loginTwitter = passport.authenticate('twitter', AUTHORIZATION_STRATEGY_OPTIONS);
