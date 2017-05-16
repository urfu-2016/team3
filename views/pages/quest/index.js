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
    const sendQueryEdit = (fieldName, value) => {
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
            sendQueryEdit('name', inputTitle.value)
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

    const paragraph = text => {
        if (text) {
            const paragraphs = text.split('\n');
            return `<p>${paragraphs.join('</p>\n<p>')}</p>`;
        }
    };

    const divTextareaText = document.createElement('div');
    divTextareaText.classList.add('big-text');
    const textareaText = document.createElement('textarea');
    textareaText.classList.add('big-text__textarea');
    textareaText.style.resize = 'vertical';
    divTextareaText.appendChild(textareaText);

    editDescription.addEventListener('click', () => {
        if (editDescription.innerText === 'mode_edit') {
            editDescription.innerText = 'done';
            textareaText.value = textQuest.innerText;
            const heightBlock = textQuest.offsetHeight > 34 ? textQuest.offsetHeight - 22 : 34;
            textareaText.style.height = heightBlock + "px";
            textSectionQuest.removeChild(textQuest);
            textSectionQuest.insertBefore(divTextareaText, editDescription);
        } else {
            sendQueryEdit('description', textareaText.value)
                .then(response => {
                    if (response.status === 200) {
                        textQuest.innerHTML = paragraph(textareaText.value);
                    }
                });
            editDescription.innerText = 'mode_edit';
            textSectionQuest.removeChild(divTextareaText);
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
