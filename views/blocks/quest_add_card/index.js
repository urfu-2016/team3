'use strict';

import {photoGeoTag} from '../../../scripts/geolocation';
import {createFloatingButtonMini} from '../../blocks/floating_button';

export default () => {
    const fileImage = document.querySelector('.add-card-form__file');

    fileImage.addEventListener('change', () => {
        const inputFile = document.querySelector('.add-card-form__file-upload');
        inputFile.style.display = 'none';
        const sectionForImage = document.querySelector('.add-card-form__file-section');

        const image = document.createElement('img');
        image.classList.add('add-card-form__image');
        image.src = URL.createObjectURL(fileImage.files[0]);

        const close = createFloatingButtonMini('close');
        close.classList.add('add-card-form__close');

        photoGeoTag(fileImage.files[0])
            .then(gps => {
                document.getElementById('latitude').value = gps.latitude;
                document.getElementById('longitude').value = gps.longitude;
            });

        close.addEventListener('click', () => {
            document.getElementById('latitude').value = '';
            document.getElementById('longitude').value = '';
            image.remove();
            close.remove();
            fileImage.value = null;
            inputFile.style.display = 'block';
        });

        sectionForImage.appendChild(image);
        sectionForImage.appendChild(close);
    });
};
