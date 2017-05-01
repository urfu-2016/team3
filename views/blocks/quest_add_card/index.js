'use strict';

import {photoGeoTag} from '../../../scripts/geolocation';
import {createFloatingButtonMini} from '../../blocks/floating_button';

export default () => {
    let fileImage = document.querySelector('.add-card-form__file');

    fileImage.addEventListener('change', () => {
        let inputFile = document.querySelector('.add-card-form__file-upload');
        inputFile.style.display = 'none';
        let sectionForImage = document.querySelector('.add-card-form__file-section');

        let image = document.createElement('img');
        image.classList.add('add-card-form__image');
        image.src = URL.createObjectURL(fileImage.files[0]);

        let close = createFloatingButtonMini('close');
        close.classList.add('add-card-form__close');

        photoGeoTag(fileImage.files[0])
            .then((gps) => {
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
}
