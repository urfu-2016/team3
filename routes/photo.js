'use strict';

const photos = require('./../controllers/photos');
const isAuth = require('../middlewares/isAuth');
const isPersistent = require('../middlewares/is-persistent-user');
const photoUrls = require('../utils/url-generator').photos;

module.exports = app => {
    app.post(photoUrls.root(), isAuth, isPersistent, photos.upload);
    app.get(photoUrls.specific(), photos.show);
    app.get(photoUrls.image(), photos.image);
    app.post(photoUrls.checkin(), isAuth, isPersistent, photos.checkin);
};

