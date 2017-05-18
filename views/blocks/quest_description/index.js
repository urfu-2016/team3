'use strict';

import {addFollowers, addLikes} from '../description';
const csrf = document.querySelector('input[name=\'_csrf\']');
const questUrls = require('../../../utils/url-generator').quests;

export default () => {
    const sectionButtons = document.querySelector('.quest-description__buttons-section');
    const followButton = sectionButtons.querySelector('.quest-description__subscribe');

    const like = document.createElement('div');
    like.classList.add('quest-description__like');
    const div = document.createElement('div');
    div.classList.add('floating-button');
    like.appendChild(div);
    const span = document.createElement('div');
    span.classList.add('material-icons');
    span.innerHTML = 'favorite';
    div.appendChild(span);

    const likeButton = sectionButtons.querySelector('.quest-description__like') ?
        sectionButtons.querySelector('.quest-description__like') :
        like;

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
                        sectionButtons.insertBefore(likeButton, followButton);
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
