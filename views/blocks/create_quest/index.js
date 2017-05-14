const createQuestForm = document.getElementById('create-quest-form');

createQuestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    grecaptcha.execute();
});
