'use strict';

const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;
const VKStrategy = require('passport-vkontakte').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

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
    const user = new User({
        name: req.body.username,
        passwordHash: req.body.password,
        email: req.body.email
    });
    user.save()
        .then(user => {
            req.logIn(user, err => err ? next(err) : res.redirect('/'));
        })
        .catch(next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.localStrategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({name: username})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username'});
                }
                if (!user.checkPassword(password)) {
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            })
            .catch(done);
    }
);

exports.loginVK = passport.authenticate('vk');

exports.loginVKCallback = passport.authenticate('vk', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
});

function saveVkAccount(params, profile, done) {
    const user = new User({
        name: profile.displayName,
        email: params.email,
        vkID: profile.id
    });
    user.save()
        .then(user => done(null, user))
        .catch(done);
}

exports.vkStrategy = (VK_ID, VK_KEY) => new VKStrategy({
    clientID: VK_ID,
    clientSecret: VK_KEY,
    callbackURL: '/login/vkontakte/callback'
}, (accessToken, refreshToken, params, profile, done) => {
    /* eslint max-params: [2, 5] */

    User.findOne({vkID: profile.id})
        .then(user => user ? done(null, user) : saveVkAccount(params, profile, done))
        .catch(done);
});

exports.loginTwitter = passport.authenticate('twitter');

exports.loginTwitterCallback = passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
});

function saveTwitterAccount(profile, done) {
    const user = new User({
        name: profile.displayName,
        twitterID: profile.id
    });
    user.save()
        .then(user => done(null, user));
}

exports.twitterStrategy = (TWITTER_KEY, TWITTER_SECRET) => new TwitterStrategy({
    consumerKey: TWITTER_KEY,
    consumerSecret: TWITTER_SECRET,
    callbackURL: '/login/twitter/callback'
}, (token, tokenSecret, profile, done) => {
    User.findOne({twitterID: profile.id})
        .then(user => user ? done(null, user) : saveTwitterAccount(profile, done))
        .catch(done);
});
