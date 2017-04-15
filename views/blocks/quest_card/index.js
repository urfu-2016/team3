'use strict';

import TouchEmitter from '../index/touch-emitter';

export const description = () => {
    const descriptions = [...document.querySelectorAll('.quest-card__description')];

    const changeDataSet = position => {
        descriptions.forEach((elem, index) => {
            if (position !== index) {
                elem.dataset.visible = 'false';
            }
        });
    };

    descriptions.forEach((elem, index) => {
        const touch = new TouchEmitter(elem);
        touch.on('tap', () => {
            elem.dataset.visible = elem.dataset.visible === 'true' ? 'false' : 'true';
            changeDataSet(index);
        });
    });
};

export const sortingRules = [
    (first, second) => {
        return new Date(second.dataset.date) - new Date(first.dataset.date);
    },
    (first, second) => {
        return Number(second.dataset.like) - Number(first.dataset.like);
    }
];
