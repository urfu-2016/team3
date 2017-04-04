'use strict';

const Quest = require('../models/quest');
const Photo = require('../models/photo');
const photosController = require('./photos');

exports.list = (req, res) => {
    Quest.find({})
        .then(quests => res.render('main', {quests}));
};

exports.show = (req, res) => {
    const id = req.params.id;
    Quest.findById(id)
        .then(quest => res.render('quest', {quest}))
        .catch(() => res.sendStatus(404));
};

exports.create = (req, res) => {
    if (req.method) {
        return new Quest(req.body)
            .save((err, quest) => {
                // TODO: handle error
                const photos = [];
                for (let i = 0; i < req.files.length; i++) {
                    photos.push(new Photo({
                        image: req.files[i].buffer,
                        location: {
                            longitude: req.body[`longitude-${i}`],
                            latitude: req.body[`latitude-${i}`]
                        },
                        description: req.body[`description-${i}`],
                        questId: quest._id
                    }).save());
                }
                Promise.all(photos)
                    .then(() => res.redirect(`/quests/${quest.id}`))
                    .catch(() => res.sendStatus(500));
            });
    }
    res.render('createQuest');
};
