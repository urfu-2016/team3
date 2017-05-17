'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');
const userUrls = require('../utils/url-generator').users;

const saveTwitterAccount = profile => new User({
    name: profile.displayName,
    twitterId: profile.id,
    avatar: profile.photos[0].value.replace('normal', '200x200')
}).save();

module.exports = (consumerKey, consumerSecret) =>
    new TwitterStrategy({
        consumerKey,
        consumerSecret,
        callbackURL: userUrls.loginTwitter()
    }, (token, tokenSecret, profile, done) =>
        /* eslint max-params: [2, 4] */
        User.findOne({twitterId: profile.id})
            .then(user => user || saveTwitterAccount(profile, done))
            .then(user => done(null, user))
            .catch(done)
    );
