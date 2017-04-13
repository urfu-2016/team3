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
            if (!photo) {
                return res.status(HttpStatus.NOT_FOUND).render('404');
            }
            res.render('photo', {photo});
        })
        .catch(next);
};

exports.image = (req, res, next) => {
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                return res.status(HttpStatus.NOT_FOUND).render('404');
            }
            res.contentType(photo.image.contentType).send(photo.image.data);
        })
        .catch(next);
};

exports.upload = (req, res, next) => {
    Quest.findById(req.body.questId)
        .exec()
        .then(quest => {
            if (!quest) {
                throw new ReferenceError(`Quest with id: ${req.body.questId} not found`);
            }
            return quest;
        })
        .then(quest => new Photo(preparePhotoData(req))
            .save()
            .then(photo => ({quest, photo}))
        )
        .then(({quest, photo}) => {
            quest.photos.push(photo._id);
            return quest.save();
        })
        .then(quest => res.redirect(`/quests/${quest.id}`))
        .catch(err => {
            if (err instanceof ReferenceError) {
                return res.status(HttpStatus.BAD_REQUEST)
                    .send(err.message);
            }
            next(err);
        });
};

function preparePhotoData(req) {
    return {
        quest: req.body.questId,
        description: req.body.description,
        location: {
            longitude: req.body.longitude,
            latitude: req.body.latitude
        },
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };
}

exports.checkin = (req, res, next) => {
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                throw new ReferenceError(`Photo with id: ${req.params.id} not found`);
            }

            const status = isCheckinSuccessful(photo.location, {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            });
            req.user.photoStatuses.push({
                photo: photo._id,
                status: status
            });
            return req.user.save()
                .then(() => status);
        })
        .then(status => res.redirect(`/photos/${photo.id}?success=${status}`))
        .catch(err => {
            if (err instanceof ReferenceError) {
                return res.status(HttpStatus.NOT_FOUND).render('404');
            }
            next(err);
        });
};

const MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS = 500;

function isCheckinSuccessful(photoLocation, playerLocation) {
    return geolib.getDistance(photoLocation, playerLocation) < MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS;
}
