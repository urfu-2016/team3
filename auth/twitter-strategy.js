'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');

const saveTwitterAccount = profile =>
    new User({
        name: profile.displayName,
        twitterID: profile.id
    }).save();

module.exports = (consumerKey, consumerSecret) =>
    new TwitterStrategy({
        consumerKey,
        consumerSecret,
        callbackURL: '/login/twitter'
    }, (token, tokenSecret, profile, done) =>
        /* eslint max-params: [2, 4] */
        User.findOne({twitterId: profile.id})
            .then(user => user || saveTwitterAccount(profile, done))
            .then(user => done(null, user))
            .catch(done)
    );
