'use strict';

const photos = require('./../controllers/photos');
const photoUrls = require('../utils/url-generator').photos;
const isAuth = require('../middlewares/is-auth');
const isPersistent = require('../middlewares/is-persistent-user');

module.exports = app => {
    app.post(photoUrls.root(), isAuth, isPersistent, photos.upload);
    app.get(photoUrls.specific(), photos.show);
    app.get(photoUrls.image(), photos.image);
    app.post(photoUrls.checkin(), isAuth, isPersistent, photos.checkin);
};

