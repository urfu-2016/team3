'use strict';

module.exports = () => {
    const elems = [...document.querySelectorAll('.quest-preview-description')];

    const isClick = (start, end) => {
        return Math.sqrt(Math.pow(start.clientX - end.clientX, 2) + Math.pow(start.clientY - end.clientY, 2)) < 5;
    };

    const change = position => {
        elems.forEach((elem, index) => {
            if (position !== index) {
                elem.dataset.visible = 'false';
            }
        });
    };

    elems.forEach((elem, index) => {
        elem.addEventListener('touchstart', event => {
            event.currentTarget.touchStartPosition = [...event.targetTouches][0];
        });
        elem.addEventListener('touchend', event => {
            if (isClick(event.currentTarget.touchStartPosition, [...event.changedTouches][0])) {
                elem.dataset.visible = elem.dataset.visible === 'true' ? 'false' : 'true';
                change(index);
            }
        });
    });
};
