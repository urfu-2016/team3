'use strict';

const createButton = (className, icon) => {
    const floatingButton = document.createElement('div');
    floatingButton.classList.add(className);

    const iconSpan = document.createElement('div');
    iconSpan.classList.add('material-icons');
    iconSpan.innerText = icon;

    floatingButton.appendChild(iconSpan);

    return floatingButton;
};

export const createFloatingButton = icon => {
    return createButton('floating-button', icon);
};

export const createFloatingButtonMini = icon => {
    return createButton('floating-button-mini', icon);
};
