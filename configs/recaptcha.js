'use strict';

const env = require('./env');
const recaptcha = require('express-recaptcha');

recaptcha.init(env.CAPTCHA_SITE_KEY, env.CAPTCHA_SECRET, {
    theme: 'dark',
    size: 'invisible',
    callback: 'onFormSubmitReCaptcha'
});
