'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const TempUser = require('../models/user/temp-user');

module.exports = new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) =>
        User.findOne({email})
            .exec()
            .then(user => user || TempUser.findOne({email}).exec())
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect email or password'});
                }
                return user.comparePassword(password)
                    .then(isMatch => isMatch
                        ? done(null, user)
                        : done(null, false, {message: 'Incorrect email or password'}));
            })
            .catch(done)
);
