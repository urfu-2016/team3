'use strict';

const Photo = require('../models/photo');
const Quest = require('../models/quest');
const HttpStatus = require('http-status');
const geolib = require('geolib');
const urls = require('../utils/url-generator');
const flashConstants = require('../configs/flash-constants');
const createError = require('../utils/create-error');

exports.show = (req, res, next) =>
    Photo.findById(req.params.id)
        .populate('quest')
        .then(photo => {
            if (!photo) {
                throw createError(`There is no photo with id ${req.params.id}`, HttpStatus.NOT_FOUND);
            }
            const userIsAllowedToSeePhoto = photo.quest.published || photo.quest.isAccessibleToUser(req.user);
            if (!userIsAllowedToSeePhoto) {
                throw createError('You are not allowed to see this photo right now', HttpStatus.FORBIDDEN);
            }
            res.render('photo', {photo, status: req.flash(flashConstants.PHOTO_CHECKIN_STATUS)});
        })
        .catch(next);

exports.image = (req, res, next) =>
    Photo.findById(req.params.id)
        .exec()
        .then(photo => {
            if (!photo) {
                return res.sendStatus(HttpStatus.NOT_FOUND);
            }
            res.contentType(photo.image.contentType).send(photo.image.data);
        })
        .catch(next);

exports.upload = (req, res, next) =>
    Quest.findById(req.body.questId)
        .exec()
        .then(quest => {
            if (!quest) {
                throw createError(`Quest with id: ${req.body.questId} not found`, HttpStatus.NOT_FOUND);
            }
            if (quest.published) {
                throw createError(`Quest with id: ${req.body.questId} is already published`,
                    HttpStatus.BAD_REQUEST);
            }
            if (!quest.isAccessibleToUser(req.user)) {
                throw createError(`You are not allowed to modify quest with id: ${req.body.questId}`,
                    HttpStatus.FORBIDDEN);
            }
            return quest;
        })
        .then(quest => new Photo(preparePhotoData(req))
            .save()
            .then(photo => ({quest, photo}))
        )
        .then(({quest, photo}) => {
            quest.photos.push(photo);
            return quest.save();
        })
        .then(quest => res.redirect(urls.quests.specific(quest.id)))
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
            data: req.files[0].buffer,
            contentType: req.files[0].mimetype
        }
    };
}

exports.checkin = (req, res, next) =>
    Photo.findById(req.params.id)
        .populate('quest')
        .exec()
        .then(photo => {
            if (!photo) {
                throw createError(`Photo with id: ${req.params.id} not found`, HttpStatus.NOT_FOUND);
            }
            if (!photo.quest.published) {
                throw createError(`Quest with id: ${req.body.questId} is not published yet`, HttpStatus.FORBIDDEN);
            }
            if (photo.quest.author.equals(req.user._id)) {
                throw createError(`You could not play in your own quest`, HttpStatus.FORBIDDEN);
            }
            if (req.user.isQuestPassed(photo.quest)) {
                throw createError(`You already passed the quest with is ${req.params.id}`,
                    HttpStatus.FORBIDDEN);
            }
            return photo;
        })
        .then(photo => req.user
            .populate('photoStatuses.photo')
            .execPopulate()
            .then(() => photo))
        .then(photo => {
            const userQuestPhotoStatuses = req.user.photoStatuses
                .filter(photoStatus => photoStatus.photo.quest.equals(photo.quest._id));
            return {photo, userQuestPhotoStatuses};
        })
        .then(({photo, userQuestPhotoStatuses}) => {
            if (!req.user.isPassingQuest(photo.quest)) {
                req.user.passingQuests.push(photo.quest);
                photo.quest.passesCount++;
            }
            const status = isCheckinSuccessful(photo.location, req.body.location);
            req.user.photoStatuses.push({photo, status});
            userQuestPhotoStatuses.push({photo, status});

            return Promise.all([
                req.user.save(),
                photo.quest.save()
            ]).then(() => ({photo, status, userQuestPhotoStatuses}));
        })
        .then(({photo, status, userQuestPhotoStatuses}) => {
            if (status) {
                return Photo.count({quest: photo.quest})
                    .exec()
                    .then(photosCount => {
                        const successfullyCheckedInPhotosCount = userQuestPhotoStatuses
                            .filter(photoStatus => photoStatus.status).length;
                        return photosCount === successfullyCheckedInPhotosCount;
                    })
                    .then(questPassed => {
                        if (questPassed) {
                            req.user.passedQuests.push(photo.quest);
                            req.user.passingQuests.remove(photo.quest);
                            photo.quest.passesCount--;
                            photo.quest.passedCount++;
                            return Promise.all([
                                req.user.save(),
                                photo.quest.save()
                            ]);
                        }
                    })
                    .then(() => status);
            }
        })
        .then(status => res.sendStatus(status ? HttpStatus.OK : HttpStatus.EXPECTATION_FAILED))
        .catch(next);

const MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS = 500;

function isCheckinSuccessful(photoLocation, playerLocation) {
    return geolib.getDistance(photoLocation, playerLocation) < MAX_DISTANCE_BETWEEN_PLAYER_AND_PHOTO_IN_METERS;
}
