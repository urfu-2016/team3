'use strict';

const root = document.querySelector('.quests-list');

const sortingRules = [
    (first, second) => {
        return new Date(second.dataset.date) - new Date(first.dataset.date);
    },
    (first, second) => {
        return Number(second.dataset.like) - Number(first.dataset.like);
    }
];

module.exports = () => {
    require('../../blocks/header')();
    require('../../blocks/questPreview')();
    require('../../blocks/sortPanel')(root, sortingRules);
    require('../../blocks/floatingMenuButton')();
};
