'use strict';

import header from '../../blocks/header';
import floatingMenu from '../../blocks/floating_menu';
import createQuest from '../../blocks/create_quest';

const addHeightLimitedModifierToTextarea = () => {
    const textarea = document.querySelector('.big-text__textarea');
    textarea.classList.add('big-text__textarea_height-limited');
};

export default () => {
    header();
    floatingMenu();
    createQuest();
    addHeightLimitedModifierToTextarea();
};
