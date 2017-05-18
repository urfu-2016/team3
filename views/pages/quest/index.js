'use strict';

import header from '../../blocks/header';
import quest from '../../blocks/quest_description';
import checkin from '../../blocks/quest_checkin';
import cardForm from '../../blocks/quest_add_card';
import Editor from '../../blocks/editor';
import {localeDate} from '../../blocks/description';
const questUrls = require('../../../utils/url-generator').quests;

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

const csrf = document.querySelector('input[name=\'_csrf\']');

const edit = () => {
    const sendEditQuery = (fieldName, value) => {
        const questId = window.location.href.split('/').pop();
        const url = window.location.origin + questUrls.edit(questId);
        const body = {};
        body[fieldName] = value;
        return fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': csrf.value
            },
            body: JSON.stringify(body),
            credentials: 'same-origin'
        });
    };

    const headerQuest = document.querySelector('.description__header');
    const titleQuest = headerQuest.querySelector('.description__title');
    const editTitle = document.getElementById('edit_title');

    const blockInputTitle = document.createElement('div');
    blockInputTitle.classList.add('edit-text');
    const inputTitle = document.createElement('input');
    inputTitle.classList.add('edit-text__input');
    blockInputTitle.appendChild(inputTitle);

    editTitle.addEventListener('click', () => {
        if (editTitle.innerText === 'mode_edit') {
            editTitle.innerText = 'done';
            inputTitle.value = titleQuest.innerText;
            headerQuest.removeChild(titleQuest);
            headerQuest.insertBefore(blockInputTitle, editTitle);
        } else {
            sendEditQuery('name', inputTitle.value)
                .then(response => {
                    if (response.status === 200) {
                        titleQuest.innerText = inputTitle.value;
                    }
                });
            editTitle.innerText = 'mode_edit';
            headerQuest.removeChild(blockInputTitle);
            headerQuest.insertBefore(titleQuest, editTitle);
        }
    });

    const textSectionQuest = document.querySelector('.description__text-section');
    const textQuest = textSectionQuest.querySelector('.description__text');
    const editDescription = document.getElementById('edit_description');

    const editorElement = document.createElement('div');
    editorElement.classList.add('description__editor');

    const editor = new Editor(editorElement, {
        autosave: true
    });

    editDescription.addEventListener('click', () => {
        if (editDescription.innerText === 'mode_edit') {
            editDescription.innerText = 'done';
            editor.setText(textQuest.innerHTML);
            textSectionQuest.removeChild(textQuest);
            textSectionQuest.insertBefore(editorElement, editDescription);
        } else {
            sendEditQuery('description', editor.text())
                .then(response => {
                    if (response.status === 200) {
                        textQuest.innerHTML = editor.text();
                    }
                });
            editDescription.innerText = 'mode_edit';
            textSectionQuest.removeChild(editorElement);
            textSectionQuest.insertBefore(textQuest, editDescription);
        }
    });
};

export default () => {
    header();
    quest();
    showPoint();
    if (document.querySelector('.main').dataset.questPublished !== 'true') {
        cardForm();
        addModifierForTextarea();
        edit();
    }
    commentRequest();
    localeDate();
};
