'use strict';

module.exports = (parent, sortRules) => {
    const selectors = [...document.querySelectorAll('.sort-panel__item')];

    const change = index => {
        selectors.forEach(selector => {
            selector.dataset.checked = 'false';
        });

        selectors[index].dataset.checked = 'true';
    };

    const filter = sortRule => {
        const childrens = [...parent.children].sort(sortRule);
        parent.innerHTML = '';
        childrens.forEach(children => {
            parent.appendChild(children);
        });
    };

    change(0);

    selectors.forEach((selector, index) => {
        selector.addEventListener('click', () => {
            change(index);
            filter(sortRules[index]);
        });
    });
};
