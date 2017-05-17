'use strict';

const nodemailer = require('nodemailer');
const env = require('./env');

exports.transportOptions = {
    service: 'Gmail',
    auth: {
        user: env.EMAIL_LOGIN,
        pass: env.EMAIL_PASSWORD
    }
};

exports.transport = nodemailer.createTransport(exports.transportOptions);
