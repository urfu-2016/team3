'use strict';

export default (parent, sortingRules) => {
    const selectors = [...document.querySelectorAll('.sort-panel__item')];
    const virtualDiv = document.createElement('div');

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
            virtualDiv.appendChild(children);
        });
        parent.innerHTML = virtualDiv.innerHTML;
        virtualDiv.innerHTML = '';
    };

    change(0);

    selectors.forEach((selector, index) => {
        selector.addEventListener('click', () => {
            change(index);
            sortContentBy(sortingRules[index]);
        });
    });
};
