'use strict';

import {validateForm} from '../../../scripts/validator-form';

export default () => {
    const fieldsRequired = ['name', 'description'];
    validateForm('create-quest__submit', fieldsRequired, true);
};
