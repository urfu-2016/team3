'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const TempUser = require('../configs/nev').options.tempUserModel;

module.exports = new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) =>
        User.findOne({email})
            .exec()
            .then(user => user || TempUser.findOne({email}).exec())
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect email'});
                }
                return user.comparePassword(password)
                    .then(isMatch => isMatch
                        ? done(null, user)
                        : done(null, false, {message: 'Incorrect password'}));
            })
            .catch(done)
);
