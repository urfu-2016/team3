'use strict';

export const addFollowers = () => {
    const followers = document.querySelector('.description-status__item-followers');
    followers.innerText = Number(followers.innerText) + 1;
};

export const addLikes = () => {
    const likes = document.querySelector('.description-status__item-likes');
    likes.innerText = Number(likes.innerText) + 1;
};

export const localeDate = () => {
    [...document.querySelectorAll('time')].forEach(item => {
        item.innerText = new Date(item.innerText).toLocaleString();
    });
};
