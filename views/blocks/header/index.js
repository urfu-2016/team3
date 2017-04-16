'use strict';

export default () => {
    const details = document.querySelector('.header__details');
    const user = document.querySelector('.header__user');

    if (details) {
        details.addEventListener('click', () => {
            details.dataset.details = details.dataset.details === 'open' ? 'close' : 'open';
            if (details.dataset.details === 'open') {
                user.classList.add('header__user-open');
            } else {
                user.classList.remove('header__user-open');
            }
        });
    }
};
