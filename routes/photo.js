'use strict';

const photos = require('./../controllers/photos');
const upload = require('./../configs/multer');

module.exports = app => {
    app.post('/photos', upload.single('image'), photos.upload);
    app.get('/photos/:id', recaptcha.middleware.render, photos.show);
    app.get('/photos/:id/image', photos.image);
    app.post('/photos/:id/checkin', recaptcha.middleware.verify, photos.checkin);
};

