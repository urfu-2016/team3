'use strict';

import header from '../../blocks/header';

const errorRender = () => {
    const code = document.querySelector('.error-page__status-code').innerText.split('');
    [...document.querySelectorAll('.photo-cards__content')].forEach((item, index) => {
        item.innerText = code[index];
    });
};

export default () => {
    header();
    errorRender();
};
