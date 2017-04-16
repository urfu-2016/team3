'use strict';

const VKStrategy = require('passport-vkontakte').Strategy;
const User = require('../models/user');

function saveVkAccount(params, profile, done) {
    return new User({
        name: profile.displayName,
        email: params.email,
        vkID: profile.id
    }).save()
        .then(user => done(null, user));
}

module.exports = (clientID, clientSecret) => new VKStrategy({
    clientID,
    clientSecret,
    callbackURL: '/login/vk/callback'
}, (accessToken, refreshToken, params, profile, done) => {
    /* eslint max-params: [2, 5] */

    User.findOne({vkID: profile.id})
        .then(user => user ? done(null, user) : saveVkAccount(params, profile, done))
        .catch(done);
});
