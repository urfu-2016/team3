'use strict';

import {addFollowers} from '../description';

export default () => {
    const follow = document.querySelector('.quest-description__subscribe');

    if (follow) {
        const icon = follow.querySelector('.material-icons');
        const iconName = icon.innerText;

        follow.addEventListener('click', () => {
            icon.innerText = 'sync';
            icon.classList.add('rotate');
            fetch(window.location.href, {method: 'post'})
                .then(response => {
                    if (response.status === 200) {
                        follow.remove();
                        addFollowers();
                    } else {
                        icon.innerText = iconName;
                        icon.classList.remove('rotate');
                    }
                });
        });
    }

    const removeQuestForm = document.querySelector('.quest-description__remove');
    if (!removeQuestForm) {
        return;
    }
    const removeQuestButton = removeQuestForm.querySelector('.floating-button');
    if (removeQuestButton) {
        removeQuestButton.classList.add('floating-button_red-background');
        removeQuestButton.addEventListener('click', () => {
            removeQuestForm.submit();
        });
    }
};
