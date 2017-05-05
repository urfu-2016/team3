'use strict';

const User = require('../models/user');
const TempUser = require('../models/user/temp-user');
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const env = require('./env');

nev.configure({
    persistentUserModel: User,
    tempUserModel: TempUser,
    tempUserCollection: TempUser.collection.collectionName,
    expirationTime: TempUser.schema.path('createdAt').options.expires,

    transportOptions: {
        service: 'Gmail',
        auth: {
            user: env.EMAIL_LOGIN,
            pass: env.EMAIL_PASSWORD
        }
    },
    verifyMailOptions: {
        from: `Do Not Reply <${env.EMAIL_LOGIN}>`,
        subject: 'PhotoQuests: account verification',
        html: '<p>Click the following <a href="${URL}">link</a> to confirm your account</p>' + // eslint-disable-line no-template-curly-in-string
              '<p>If you are unable to click to the link, just copy and paste ${URL} into your browser</p>' + // eslint-disable-line no-template-curly-in-string
              '<p>Please, don\'t reply to this message. It\'s automatically generated.</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}' // eslint-disable-line no-template-curly-in-string
    },
    confirmMailOptions: {
        from: `Do Not Reply <${env.EMAIL_LOGIN}>`,
        subject: 'PhotoQuests: account successfully verified!',
        html: '<p>Your account has been successfully verified.</p>',
        text: 'Your account has been successfully verified.'
    }
}, error => {
    if (error) {
        console.error(error);
    }
});

module.exports = nev;
