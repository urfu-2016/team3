const createQuestForm = document.getElementById('create-quest-form');

createQuestForm.addEventListener('submit', event => {
    /* global grecaptcha */
    event.preventDefault();
    grecaptcha.execute();
});
