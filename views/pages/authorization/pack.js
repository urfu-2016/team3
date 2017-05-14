'use strict';

require('./index.styl');
import header from '../../blocks/header';

header();

const registrationForm = document.getElementById('registration-form');

if (registrationForm) {
    registrationForm.addEventListener('submit', event => {
        /* global grecaptcha */
        event.preventDefault();
        grecaptcha.execute();
    });
}
