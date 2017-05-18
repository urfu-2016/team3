'use strict';

module.exports = (req, res, next) => {
    if (req.recaptcha.error) {
        switch (req.recaptcha.error) {
            case 'invalid-input-secret':
            case 'missing-input-secret':
                console.error(`reCaptcha secret key is ${req.recaptcha.error.split('-')[0]}`);
                return next(new Error('There is a problem on our side. We already knows about it. Please, try again later.'));
            case 'missing-input-response':
                console.error('User\'s reCaptcha response was lost');
                return next(new Error('There is a problem on our side. We already knows about it. Please, try again later.'));
            case 'invalid-input-response':
                return next(new Error('Your solution was wrong! Please, try again'));
            default:
                return next(new Error(`Undefined reCaptcha error: ${req.recaptcha.error}`));
        }
    }
    next();
};
