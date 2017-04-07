'use strict';

const Photo = require('../models/photo');
const Quest = require('../models/quest');

exports.show = (req, res, next) => {
    const id = req.params.id;
    Photo.findById(id)
<<<<<<< ee595b36ba16832199fde771afda71452200c1a2
        .then(photo => res.render('photo', {photo, captcha: req.recaptcha}))
        .catch(() => res.sendStatus(404));
=======
        .then(photo => {
            if (photo) {
                res.render('photo', {photo});
            } else {
                res.status(404).render('404');
            }
        })
        .catch(next);
>>>>>>> Try to improve user workflow
};

exports.image = (req, res, next) => {
    Photo.findById(req.body.id)
        .then(photo => {
            if (photo) {
                res.send(photo.image);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(next);
};

exports.upload = (req, res, next) => {
    const questId = req.body.questId;
    new Photo({
        questId,
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
                    {$push: {photoIds: photo._id}},
                    {safe: true, upsert: true, new: true}
                )
                .exec()
                .then(quest => res.render(`/quests/${quest.id}`))
                .catch(next);
        })
        .catch(next);
};

exports.checkin = (req, res, next) => {
    Photo.findById(req.body.id)
        .then(photo => {
            if (!photo) {
                return res.status(404).render('404');
            }

            const isCheckinSucceed = isCheckinSuccessful(photo, {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            });
            User
                .findByIdAndUpdate(
                    req.user._id,
                    {
                        $push: {
                            photoStatuses: {
                                photoId: photo._id,
                                status: isCheckinSucceed
                            }
                        }
                    },
                    {safe: true, upsert: true, new: true}
                )
                .exec()
                .then(user => res.redirect(`/photos/${photo.id}`))
                .catch(next);
        })
        .catch(next);
};

function isCheckinSuccessful(photo, coordinates) {
    return Math.sqrt(
            Math.pow(photo.longitude - coordinates.longitude, 2) + Math.pow(photo.latitude - coordinates.latitude, 2)
        ) < 0.005;
}
