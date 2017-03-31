'use strict';

module.exports = (parent, sortingRules) => {
    const selectors = [...document.querySelectorAll('.sort-panel__item')];

    const change = index => {
        selectors.forEach(selector => {
            selector.dataset.checked = 'false';
        });

        selectors[index].dataset.checked = 'true';
    };

    const sortContentBy = sortingRule => {
        const childrens = [...parent.children].sort(sortingRule);
        parent.innerHTML = '';
        childrens.forEach(children => {
            parent.appendChild(children);
        });
    };

    change(0);

    selectors.forEach((selector, index) => {
        selector.addEventListener('click', () => {
            change(index);
            sortContentBy(sortingRules[index]);
        });
    });
};
