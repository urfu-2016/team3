'use strict';

import {photoGeoTag} from '../../../scripts/geolocation';
import {createFloatingButtonMini} from '../../blocks/floating_button';

export default () => {
    const form = document.querySelector('.add-card-form');

    const longitude = document.getElementById('longitude');
    const latitude = document.getElementById('latitude');

    const fileInput = form.querySelector('.add-card-form__file');

    fileInput.addEventListener('change', () => {
        const fileInputLabel = document.querySelector('.add-card-form__file-upload');
        fileInputLabel.style.display = 'none';
        document.querySelector('.add-card-form__plus').style.animationIterationCount = '0';
        const imageSection = document.querySelector('.add-card-form__file-section');

        const image = document.createElement('img');
        image.classList.add('add-card-form__image');
        image.src = URL.createObjectURL(fileInput.files[0]);

        const close = createFloatingButtonMini('close');
        close.classList.add('add-card-form__close');

        photoGeoTag(fileInput.files[0])
            .then(gps => {
                latitude.value = gps.latitude.toFixed(5);
                latitude.parentNode.classList.remove('edit-text__invalid');
                longitude.value = gps.longitude.toFixed(5);
                longitude.parentNode.classList.remove('edit-text__invalid');
            })
            .catch(() => {});

        close.addEventListener('click', () => {
            latitude.value = '';
            longitude.value = '';
            image.remove();
            close.remove();
            fileInput.value = null;
            fileInputLabel.style.display = 'block';
        });

        imageSection.appendChild(image);
        imageSection.appendChild(close);
    });

    form.addEventListener('submit', event => {
        if (!fileInput.value) {
            event.preventDefault();
            const plus = form.querySelector('.add-card-form__plus');
            plus.style.animationIterationCount = 'infinite';
        }
    });
};
