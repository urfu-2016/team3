'use strict';

import {createFloatingButton} from '../floating_button';
import TouchEmitter from '../index/touch-emitter';
import geoLocation from '../index/geolocation';

export default (images, start) => {
    const className = 'quest-checkin';
    document.body.style.overflow = 'hidden';

    const csrf = document.querySelector('input[name=\'_csrf\']');

    let index = start;
    const len = images.length - 1;

    const pointShow = document.createElement('section');
    pointShow.classList.add(className);
    pointShow.addEventListener('click', closeFullScreenImage);

    function closeFullScreenImage() {
        document.body.style.overflow = '';
        pointShow.remove();
    }

    const content = document.createElement('div');
    content.classList.add(`${className}__content`);

    const img = document.createElement('img');
    img.classList.add(`${className}__image`);
    img.src = images[index].querySelector('img').src;
    content.appendChild(img);

    const follow = document.createElement('div');
    follow.classList.add(`${className}__checkin`);
    follow.appendChild(createFloatingButton('place'));
    const icon = follow.querySelector('.material-icons');
    const error = () => {
        icon.innerText = 'place';
        icon.classList.remove('rotate');
        images[index].dataset.check = 'false';
    };

    follow.addEventListener('click', event => {
        event.stopPropagation();
        icon.innerText = 'sync';
        icon.classList.add('rotate');
        geoLocation().then(location => {
            const url = img.src.replace('image', 'checkin');
            const questId = window.location.href.split('/').pop();
            fetch(url, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-Token': csrf.value
                },
                body: JSON.stringify({location, questId}),
                credentials: 'same-origin'
            }).then(response => {
                if (response.status === 200) {
                    images[index].dataset.check = 'true';
                    follow.remove();
                } else {
                    error();
                }
            });
        }).catch(() => {
            error();
        }).then(closeFullScreenImage);
    });

    const showBtn = () => {
        if (images[index].dataset.check === 'true') {
            follow.remove();
        } else {
            pointShow.appendChild(follow);
        }
    };
    const nextPoint = () => {
        index = index === len ? 0 : index + 1;
        img.src = images[index].querySelector('img').src;
        showBtn();
    };
    const prevPoint = () => {
        index = index === 0 ? len : index - 1;
        img.src = images[index].querySelector('img').src;
        showBtn();
    };

    img.addEventListener('click', event => {
        event.stopPropagation();
        nextPoint();
    });

    const touch = new TouchEmitter(img);
    touch.on('tap', nextPoint);
    touch.on('swipeLeft', nextPoint);
    touch.on('swipeRight', prevPoint);

    showBtn();

    pointShow.appendChild(content);

    return pointShow;
};
