'use strict';

const Photo = require('../models/photo');
const Quest = require('../models/quest');
const HttpStatus = require('http-status');
const geolib = require('geolib');

exports.show = (req, res, next) =>
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                const err = new Error(`There is no photo with id ${req.params.id}`);
                err.status = HttpStatus.NOT_FOUND;
                throw err;
            }
            res.render('photo', {photo});
        })
        .catch(next);

exports.image = (req, res, next) =>
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                const err = new Error(`There is no photo with id ${req.params.id}`);
                err.status = HttpStatus.NOT_FOUND;
                throw err;
            }
            res.contentType(photo.image.contentType).send(photo.image.data);
        })
        .catch(next);

exports.upload = (req, res, next) =>
    Quest.findById(req.body.questId)
        .exec()
        .then(quest => {
            if (!quest) {
                const err = new Error(`Quest with id: ${req.body.questId} not found`);
                err.status = HttpStatus.NOT_FOUND;
                throw err;
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
        .catch(next);

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

exports.checkin = (req, res, next) =>
    Photo.findById(req.params.id)
        .then(photo => {
            if (!photo) {
                const err = new Error(`Photo with id: ${req.params.id} not found`);
                err.status = HttpStatus.NOT_FOUND;
                throw err;
            }

            return photo;
        })
        .then(photo => {
            const status = isCheckinSuccessful(photo.location, {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            });
            req.user.photoStatuses.push({
                photo: photo,
                status
            });
            return req.user.save()
                .then(() => ({photo, status}));
        })
        .then(({photo, status}) => res.redirect(`/photos/${photo.id}?success=${status}`))
        .catch(next);

const MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS = 500;

function isCheckinSuccessful(photoLocation, playerLocation) {
    return geolib.getDistance(photoLocation, playerLocation) < MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS;
}
