'use strict';

const Photo = require('../models/photo');
const Quest = require('../models/quest');
const User = require('../models/user');
const HttpStatus = require('http-status');
const geolib = require('geolib');

exports.show = (req, res, next) => {
    const id = req.params.id;
    Photo.findById(id)
        .then(photo => {
            if (photo) {
                res.render('photo', {photo});
            } else {
                res.status(HttpStatus.NOT_FOUND).render('404');
            }
        })
        .catch(next);
};

exports.image = (req, res, next) => {
    Photo.findById(req.params.id)
        .then(photo => {
            if (photo) {
                res.send(photo.image);
            } else {
                res.status(HttpStatus.NOT_FOUND).render('404');
            }
        })
        .catch(next);
};

exports.upload = (req, res, next) => {
    const questId = req.body.questId;
    new Photo({
        quest: questId,
        description: req.body.description,
        location: {
            longitude: req.body.longitude,
            latitude: req.body.latitude
        },
        image: req.file.buffer
    })
        .save()
        .then(photo => {
            Quest
                .findByIdAndUpdate(
                    questId,
                    {$push: {photos: photo._id}},
                    {safe: true, upsert: true, new: true}
                )
                .exec()
                .then(quest => res.redirect(`/quests/${quest.id}`))
                .catch(next);
        })
        .catch(next);
};

exports.checkin = (req, res, next) => {
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                return res.status(HttpStatus.NOT_FOUND).render('404');
            }

            const isCheckinSucceed = isCheckinSuccessful(photo.location, {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            });
            User
                .findByIdAndUpdate(
                    req.user._id,
                    /* ESLint gives me an error, that following lines should be
                     indented 4 spaces left. It's, ofc, mistake */

                     /* eslint-disable indent */
                    {
                        $push: {
                            photoStatuses: {
                                photo: photo._id,
                                status: isCheckinSucceed
                            }
                        }
                    },
                    {safe: true, upsert: true, new: true}
                )
                .exec()
                .then(() => res.redirect(`/photos/${photo.id}`))
                .catch(next);
        })
        .catch(next);
};

const MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS = 500;

function isCheckinSuccessful(photoLocation, playerLocation) {
    return geolib.getDistance(photoLocation, playerLocation) < MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS;
}
