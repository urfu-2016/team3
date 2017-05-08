'use strict';

import {photoGeoTag} from '../../../scripts/geolocation';
import {createFloatingButtonMini} from '../../blocks/floating_button';

export default () => {
    const fileInput = document.querySelector('.add-card-form__file');

    fileInput.addEventListener('change', () => {
        const fileInputLabel = document.querySelector('.add-card-form__file-upload');
        fileInputLabel.style.display = 'none';
        const imageSection = document.querySelector('.add-card-form__file-section');

        const image = document.createElement('img');
        image.classList.add('add-card-form__image');
        image.src = URL.createObjectURL(fileInput.files[0]);

        const close = createFloatingButtonMini('close');
        close.classList.add('add-card-form__close');

        photoGeoTag(fileInput.files[0])
            .then(({latitude, longitude}) => {
                document.getElementById('latitude').value = latitude.toFixed(5);
                document.getElementById('longitude').value = longitude.toFixed(5);
            });

        close.addEventListener('click', () => {
            document.getElementById('latitude').value = '';
            document.getElementById('longitude').value = '';
            image.remove();
            close.remove();
            fileInput.value = null;
            fileInputLabel.style.display = 'block';
        });

        imageSection.appendChild(image);
        imageSection.appendChild(close);
    });
};
