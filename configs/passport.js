'use strict';

const passport = require('passport');

const User = require('../models/user');
const TempUser = require('../models/user/temp-user');
const vkStrategy = require('../auth/vk-strategy');
const twitterStrategy = require('../auth/twitter-strategy');
const localStrategy = require('../auth/local-strategy');
const env = require('./env');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
    User.findById(id)
        .exec()
        .then(user => user || TempUser.findById(id).exec())
        .then(user => done(null, user), done)
);

passport.use('local', localStrategy);

passport.use('vk', vkStrategy(env.VK_ID, env.VK_KEY));

passport.use('twitter', twitterStrategy(env.TWITTER_KEY, env.TWITTER_SECRET));

module.exports = passport;
