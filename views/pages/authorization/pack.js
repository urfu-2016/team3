'use strict';

require('./index.styl');
import header from '../../blocks/header';
import {validateForm} from '../../../scripts/validator-form';

header();

const requiredFields = ['email', 'password'];

if (document.getElementById('username')) {
    requiredFields.push('username');
    validateForm('authorization__submit', requiredFields, true);
} else {
    validateForm('authorization__submit', requiredFields, false);
}
