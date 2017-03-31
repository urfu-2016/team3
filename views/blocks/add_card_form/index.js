function loadFile(event) {
    var cardImage = document.getElementById('card-image');
    cardImage.src = URL.createObjectURL(event.target.files[0]);
}
