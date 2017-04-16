'use strict';

import header from '../../blocks/header';
import floatingMenu from '../../blocks/floating_menu';
import searchPanel from '../../blocks/sort_panel';
import {description, sortingRules} from '../../blocks/quest_card';

export default () => {
    header();
    description();
    searchPanel(document.querySelector('.quests-list'), sortingRules);
    floatingMenu();
};
