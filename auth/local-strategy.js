'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const TempUser = require('../models/user/temp-user');
const {transport} = require('../configs/email');
const env = require('../configs/env');

module.exports = new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) =>
        User.getAuthenticated(email, password)
            .catch(err => {
                if (err.reason === User.failedLogin.NOT_FOUND) {
                    return TempUser.getAuthenticated(email, password);
                }
                throw err;
            })
            .then(user => done(null, user))
            .catch(err => {
                switch (err.reason) {
                    case User.failedLogin.MAX_ATTEMPTS_REACHED:
                        transport.sendMail({
                            to: email,
                            from: `Do Not Reply <${env.EMAIL_LOGIN}>`,
                            subject: 'PhotoQuests: security',
                            text: 'Your account has been blocked because login attempts was exceeded threshold'
                        });
                    case User.failedLogin.MAX_ATTEMPTS: // eslint-disable-line no-fallthrough
                    case User.failedLogin.NOT_FOUND:
                    case User.failedLogin.PASSWORD_INCORRECT:
                        return done(null, false, {message: 'Incorrect email or password'});
                    default:
                        return done(err);
                }
            })
);
