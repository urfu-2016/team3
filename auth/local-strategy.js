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
                if (!user.checkPassword(password)) {
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            })
            .catch(done)
);
