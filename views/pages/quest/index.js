'use strict';

import header from '../../blocks/header';
import quest from '../../blocks/quest_description';
import checkin from '../../blocks/quest_checkin';
import cardForm from '../../blocks/quest_add_card';
import Editor from '../../blocks/editor';

const showPoint = () => {
    const questPoints = [...document.querySelector('.quest__points').children];

    questPoints.forEach((point, index) => {
        point.addEventListener('click', () => {
            document.body.appendChild(checkin(questPoints, index));
        });
    });
};

const addModifierForTextarea = () => {
    const textarea = document.querySelector('.add-card-form').querySelector('.big-text__textarea');
    textarea.classList.add('big-text__textarea_height-fixed');
};

const commentRequest = () => {
    const editorElement = document.querySelector('.comments__editor');
    if (!editorElement) { // Comment could not be written now
        return;
    }
    const editor = new Editor(editorElement, {
        autosave: true
    });
    const form = document.querySelector('.comments__form');

    form.addEventListener('submit', () => {
        editor.render();
        editor.clear();
        editor.removeFromLocalStorage();
    });
};

export default () => {
    header();
    quest();
    showPoint();
    if (document.querySelector('.main').dataset.questPublished !== 'true') {
        cardForm();
        addModifierForTextarea();
    }
    commentRequest();
};
