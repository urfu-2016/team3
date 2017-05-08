'use strict';

import header from '../../blocks/header';
import floatingMenu from '../../blocks/floating_menu';

const addModifierForTextarea = () => {
    const textarea = document.querySelector('.big-text__textarea');
    textarea.classList.add('big-text__textarea_height-limited');
};

export default () => {
    header();
    floatingMenu();
    addModifierForTextarea();
};
