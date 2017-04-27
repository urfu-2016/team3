'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/user');
const userUrls = require('../utils/url-generator').users;

const saveVkAccount = profile => new User({
    name: profile.displayName,
    vkId: profile.id
}).save();

module.exports = (clientID, clientSecret) =>
    new VKStrategy({
        clientID,
        clientSecret,
        callbackURL: userUrls.loginVK()
    }, (accessToken, refreshToken, params, profile, done) =>
        /* eslint max-params: [2, 5] */
        User.findOne({vkId: profile.id})
            .then(user => user || saveVkAccount(profile))
            .then(user => done(null, user))
            .catch(done)
    );
