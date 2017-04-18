'use strict';

const env = require('./env');
const recaptcha = require('express-recaptcha');

recaptcha.init(env.CAPTCHA_SITE_KEY, env.CAPTCHA_SECRET, {
    theme: 'dark',
    size: 'invisible',
    callback: 'onFormSubmit'
});

const originalRender = recaptcha.middleware.render;

recaptcha.middleware.render = (formId, submitButtonId) => {
    return (req, res, next) => {
        originalRender(req, res, () => {
            req.recaptcha +=
                '<script type="text/javascript">' +
                '   function onFormSubmit() {' +
                `       document.getElementById('${formId}').submit();` +
                '   }' +
                '</script>';

            req.recaptcha = req.recaptcha.replace(/g-recaptcha" data/,
                `g-recaptcha" data-bind="${submitButtonId}" data`);
            next();
        })
    };
};
