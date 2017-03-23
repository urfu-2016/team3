'use strict';

const name = 'floating-menu-button';

module.exports = links => {
    links = links || [];

    const buttonGroup = document.querySelector(`.${name}`);
    const menu = buttonGroup.querySelector(`.${name}__btn`);
    const menuIcon = menu.querySelector('.material-icons');
    const menuItems = [...buttonGroup.querySelectorAll(`.${name}__item`)];
    let start = pageYOffset;

    menuIcon.classList.add(`${name}-animation`);

    menuItems.forEach((elem, index) => {
        elem.href = links[index] || '#';
    });

    const changeMenu = elem => {
        elem.dataset.menu = elem.dataset.menu === 'close' ? 'open' : 'close';
    };

    addEventListener('scroll', () => {
        buttonGroup.dataset.visible = pageYOffset > start ? 'false' : 'true';
        start = pageYOffset;
    });

    menu.addEventListener('click', () => {
        changeMenu(menu);
        if (menu.dataset.menu === 'close') {
            menuIcon.classList.remove(`${name}-open`);
            menuIcon.innerHTML = 'menu';
        } else {
            menuIcon.classList.add(`${name}-open`);
            menuIcon.innerHTML = 'clear';
        }
        menuItems.forEach(item => {
            changeMenu(item);
        });
    });
};
