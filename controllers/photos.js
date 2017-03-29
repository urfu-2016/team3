'use strict';

const Photo = require('../models/photo');

exports.show = (req, res) => {
    const id = req.params.id;
    const photo = Photo.findById(id);

    if (photo) {
        res.render('photo', {photo});
    } else {
        res.sendStatus(404);
    }
};

function isCheckinSuccessful(photo, coordinates) {
    return Math.sqrt(
            Math.pow(photo.longitude - coordinates.longitude, 2) + Math.pow(photo.latitude - coordinates.latitude, 2)
        ) < 0.005;
}

exports.checkin = (req, res) => {
    const photo = Photo.findById(req.body.id);
    if (!photo) {
        return res.sendStatus(404);
    }

    if (isCheckinSuccessful(photo, {longitude: req.body.longitude, latitude: req.body.longitude})) {
        // TODO: make some useful stuff
    }
    res.redirect(`/photos/${photo.id}`);
};
