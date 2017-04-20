'use strict';

import header from '../../blocks/header';
import floatingMenu from '../../blocks/floating_menu';

export default () => {
    header();
    floatingMenu();
    const textarea = document.querySelector('.big-text__textarea');
    textarea.classList.add('big-text__textarea_max-height');
};
