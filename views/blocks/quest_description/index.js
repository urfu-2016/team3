'use strict';

import {addFollowers, addLikes} from '../description';
const csrf = document.querySelector('input[name=\'_csrf\']');
const questUrls = require('../../../utils/url-generator').quests;

export default () => {
    const followButton = document.querySelector('.quest-description__subscribe');

    if (followButton) {
        const icon = followButton.querySelector('.material-icons');
        const iconName = icon.innerText;
        followButton.addEventListener('click', () => {
            icon.innerText = 'sync';
            icon.classList.add('rotate');
            const questId = window.location.href.split('/').pop();
            const url = window.location.origin + questUrls.follow(questId);
            fetch(url, {
                method: 'post',
                headers: {
                    'X-CSRF-Token': csrf.value
                },
                credentials: 'same-origin'})
                .then(response => {
                    if (response.status === 200) {
                        followButton.remove();
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
