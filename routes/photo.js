'use strict';

const photos = require('./../controllers/photos');
const upload = require('./../configs/multer');
const recaptcha = require('express-recaptcha');
const isAuth = require('../middlewares/isAuth');

module.exports = app => {
    app.post('/photos', isAuth, upload.single('image'), photos.upload);
    app.get('/photos/:id', recaptcha.middleware.render, photos.show);
    app.get('/photos/:id/image', photos.image);
    app.post('/photos/:id/checkin', isAuth, recaptcha.middleware.verify, photos.checkin);
};

