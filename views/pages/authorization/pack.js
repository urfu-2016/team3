'use strict';

require('./index.styl');
import header from '../../blocks/header';
import {validatorFormReCaptcha} from '../../../scripts/validator-form-recaptcha';

header();

const fieldsRequired = ['email', 'password'];

if (document.getElementById('username')) {
    fieldsRequired.push('username');
    validatorFormReCaptcha('authorization__submit', fieldsRequired, true);
} else {
    validatorFormReCaptcha('authorization__submit', fieldsRequired, false);
}
