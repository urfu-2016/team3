import Editor from '../../blocks/editor';

export default function () {
    const editor = new Editor(document.querySelector('.create-quest__editor'), {name: 'description'});
    const createQuestForm = document.getElementById('create-quest-form');

    createQuestForm.addEventListener('submit', event => {
        /* global grecaptcha */
        event.preventDefault();
        editor.render();
        grecaptcha.execute();
    });
}
