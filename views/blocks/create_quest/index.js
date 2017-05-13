'use strict';

import {validatorFormReCaptcha} from '../../../scripts/validator-form-recaptcha';

export default () => {
    const fieldsRequired = ['name', 'description'];
    validatorFormReCaptcha('create-quest__submit', fieldsRequired, true);
}
