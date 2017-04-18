'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/user');

function saveTwitterAccount(profile, done) {
    return new User({
        name: profile.displayName,
        twitterID: profile.id
    }).save()
        .then(user => done(null, user));
}

module.exports = (consumerKey, consumerSecret) => new TwitterStrategy({
    consumerKey,
    consumerSecret,
    callbackURL: '/login/twitter'
}, (token, tokenSecret, profile, done) => {
    User.findOne({twitterId: profile.id})
        .then(user => user ? done(null, user) : saveTwitterAccount(profile, done))
        .catch(done);
});
