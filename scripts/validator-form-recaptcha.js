'use strict';

export const validatorFormReCaptcha = (buttonId, ids, recaptcha) => {
    const button = document.getElementById(buttonId);

    const fields = ids.map(id => {
        const node = document.getElementById(id);
        return {
            node,
            invalidClass: node.nodeName === 'INPUT' ? 'edit-text__invalid' : 'big-text__invalid'
        };
    });

    button.addEventListener('click', event => {
        event.preventDefault();
        let hasInvalidField = false;

        fields.forEach(field => {
            if (!field.node.value) {
                hasInvalidField = true;
                field.node.parentNode.classList.add(field.invalidClass);
            }
        });

        if (!hasInvalidField) {
            recaptcha ? grecaptcha.execute() : button.submit();
        }
    });

    fields.forEach(field => {
        field.node.addEventListener('input', () => {
            field.node.parentNode.classList.remove(field.invalidClass);
        });
    });
};