'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) =>
        User.findOne({email})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect email'});
                }
                user.comparePassword(password)
                    .then(isMatch => isMatch
                        ? done(null, user)
                        : done(null, false, {message: 'Incorrect password'}))
                    .catch(done);
            })
            .catch(done)
);
