'use strict';

const root = document.querySelector('.quests-list');

const filterRules = [
    (first, second) => {
        return new Date(first.dataset.date) < new Date(second.dataset.date);
    },
    (first, second) => {
        return Number(first.dataset.like) < Number(second.dataset.like);
    }
];

module.exports = (() => {
    require('../../blocks/header')();
    require('../../blocks/questPreview')();
    require('../../blocks/sortPanel')(root, filterRules);
    require('../../blocks/floatingMenuButton')();
})();
