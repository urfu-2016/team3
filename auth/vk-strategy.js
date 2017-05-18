'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/user');
const userUrls = require('../utils/url-generator').users;

const saveVkAccount = profile => new User({
    name: profile.displayName,
    vkId: profile.id,
    avatar: profile.photos[0].value
}).save();

module.exports = (clientID, clientSecret) =>
    new VKStrategy({
        clientID,
        clientSecret,
        callbackURL: userUrls.loginVK(),
        lang: 'ru',
        passReqToCallback: true
    }, (req, accessToken, refreshToken, params, profile, done) =>
        /* eslint max-params: [2, 6] */
        User.findOne({vkId: profile.id})
            .then(user => {
                if (!req.user) {
                    return user || saveVkAccount(profile, done);
                }
                return User.findByIdAndRemove(user._id)
                    .exec()
                    .then(() => {
                        req.user.vkId = profile.id;
                        return req.user.save();
                    });
            })
            .then(user => done(null, user))
            .catch(done)
    );
