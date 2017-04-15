'use strict';

const name = 'floating-menu-button';

export default () => {
    const buttonGroup = document.querySelector(`.${name}`);
    const menu = buttonGroup.querySelector(`.${name}__btn`);
    const menuIcon = menu.querySelector('.material-icons');
    const menuItems = [...buttonGroup.querySelectorAll(`.${name}__item`)];
    let start = pageYOffset;

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
            menuIcon.innerText = 'menu';
        } else {
            menuIcon.classList.add(`${name}-open`);
            menuIcon.innerText = 'clear';
        }
        menuItems.forEach(item => {
            changeMenu(item);
        });
    });
};
