'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = new LocalStrategy(
    (username, password, done) => {
        User.findOne({nickname: username})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username'});
                }
                if (!user.checkPassword(password)) {
                    return done(null, false, {message: 'Incorrect password'});
                }
                return done(null, user);
            })
            .catch(done);
    }
);
