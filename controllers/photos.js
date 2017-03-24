'use strict';

const Photo = require('../models/photo');

exports.show = (res, req) => {
    const id = req.params.id;
    const photo = Photo.findById(id);

    if (photo) {
        res.render('photo', Object.assign({photo: photo}, res.locals));
    } else {
        res.sendStatus(404);
    }
};

function isCheckinSuccessful(photo, coordinates) {
    return Math.sqrt(
            Math.pow(photo.longitude - coordinates.longitude, 2) + Math.pow(photo.latitude - coordinates.latitude, 2)
        ) < .005
}

exports.checkin = (res, req) => {
    const photo = Photo.findById(req.body.id);
    if (!photo) {
        return res.sendStatus(404);
    }

    if (isCheckinSuccessful(photo, { longitude: req.body.longitude, latitude: req.body.longitude })) {
        // TODO make some useful stuff
    }
    res.redirect(`/photos/${photo.id}`)
};
