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
        callbackURL: userUrls.loginTwitter(),
        passReqToCallback: true
    }, (req, token, tokenSecret, profile, done) =>
        /* eslint max-params: [2, 5] */
        User.findOne({twitterId: profile.id})
            .then(user => {
                if (!req.user) {
                    return user || saveTwitterAccount(profile, done);
                }
                return User.findByIdAndRemove(user._id)
                    .exec()
                    .then(() => {
                        req.user.twitterId = profile.id;
                        return req.user.save();
                    });
            })
            .then(user => done(null, user))
            .catch(done)
    );
