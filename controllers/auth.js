'use strict';

const passport = require('passport');
const HttpStatus = require('http-status');
const User = require('../models/user');
const Photo = require('../models/photo');
const urls = require('../utils/url-generator');
const nev = require('../configs/nev');
const extractDomain = require('../utils/extract-domain');
const flashConstants = require('../configs/flash-constants');
const createError = require('../utils/create-error');

const AUTHORIZATION_STRATEGY_OPTIONS = {
    successReturnToOrRedirect: urls.common.main(),
    failureRedirect: urls.users.login(),
    failureFlash: true
};
const RANDOM_PHOTOS_COUNT = 3;
const DEFAULT_RANDOM_PHOTOS = [
    'http://www.topkurortov.com/wp-content/uploads/2015/10/Chynkve-Terre.jpg',
    'http://cdn.fishki.net/upload/post/2016/05/03/1939577/0ace592ec84ae23d60be05367f0d05dd.jpg',
    'http://lifeglobe.net/x/entry/4600/15.jpg'
];

const renderAuthorizationPage = (req, res, next, cb) =>
    Photo.count().exec()
        .then(count => {
            const random = Math.floor(Math.random() * (Math.max(count - RANDOM_PHOTOS_COUNT, 0)));
            return Photo.find()
                .skip(random)
                .limit(RANDOM_PHOTOS_COUNT)
                .exec()
                .then(randomPhotos => randomPhotos.map(photo => urls.photos.image(photo._id)))
                .then(randomPhotos => randomPhotos.concat(DEFAULT_RANDOM_PHOTOS).slice(0, 3))
                .then(cb);
        })
        .catch(next);

exports.loginPage = (req, res, next) => renderAuthorizationPage(req, res, next,
    randomPhotos => res.render('authorization/login', {
        photos: randomPhotos,
        error: req.flash(flashConstants.ERROR),
        message: req.flash(flashConstants.MESSAGE)
    }));

exports.registerPage = (req, res) => renderAuthorizationPage(req, res, next,
    randomPhotos => res.render('authorization/registration', {
        photos: randomPhotos,
        error: req.flash(flashConstants.ERROR),
        message: req.flash(flashConstants.MESSAGE)
    }));

exports.emailVerification = (req, res, next) =>
    nev.confirmTempUser(req.params.id, (err, user) => {
        if (err) {
            next(err);
        }

        if (user) {
            if (req.user) {
                // TODO: don't forget to call req.flash('message') in /profile handler
                req.flash(flashConstants.MESSAGE, 'You successfully verified your account');
                res.redirect(urls.users.profile());
            } else {
                req.flash(flashConstants.MESSAGE, 'You successfully verified your account. Sign in, please');
                res.redirect(urls.users.login());
            }
        } else {
            req.flash(flashConstants.ERROR, 'Your account was expired. Please, start again');
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
                req.flash(flashConstants.ERROR, 'Your solution was wrong! Please, try again');
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
            return next(createError('Creating temp user failed'));
        }

        if (existingPersistentUser) {
            return next(createError('You have already signed up and confirmed your account. Try to login',
                HttpStatus.FORBIDDEN));
        }

        if (newTempUser) {
            const URL = newTempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(newTempUser.email, URL, err => {
                if (err) {
                    console.error(err.message, err);
                    return next(createError('Sending verification email failed'));
                }
                return exports.loginLocal(req, res, next);
            });
        } else {
            next(createError('You have already signed up. Please check your email to verify your account',
                HttpStatus.FORBIDDEN));
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
