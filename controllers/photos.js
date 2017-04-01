'use strict';

const Photo = require('../models/photo');

exports.show = (req, res) => {
    const id = req.params.id;
    Photo.findById(id)
        .then(photo => res.render('photo', {photo, captcha: req.recaptcha}))
        .catch(() => res.sendStatus(404));
};

function isCheckinSuccessful(photo, coordinates) {
    return Math.sqrt(
            Math.pow(photo.longitude - coordinates.longitude, 2) + Math.pow(photo.latitude - coordinates.latitude, 2)
        ) < 0.005;
}

exports.checkin = (req, res) => {
    Photo.findById(req.body.id)
        .then(photo => {
            if (isCheckinSuccessful(photo, {longitude: req.body.longitude, latitude: req.body.longitude})) {
                // TODO: make some useful stuff
            }
            res.redirect(`/photos/${photo.id}`);
        })
        .catch(() => res.sendStatus(404));
};
