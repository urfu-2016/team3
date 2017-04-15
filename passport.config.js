'use strict';

const passport = require('passport');

const User = require('./models/user');
const auth = require('./controllers/auth');
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

passport.use('local', auth.localStrategy);

passport.use('vk', auth.vkStrategy(process.env.VK_ID, process.env.VK_KEY));

passport.use('twitter',
    auth.twitterStrategy(process.env.TWITTER_KEY, process.env.TWITTER_SECRET));

module.exports = passport;
