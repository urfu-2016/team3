'use strict';

const Quest = require('../models/quest');

exports.list = (req, res) => {
    Quest.find({})
        .then(quests => res.render('main', {quests}));
};

exports.show = (req, res) => {
    const id = req.params.id;
    Quest.findById(id)
        .then((err, quest) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.render('quest', {quest});
            }
        });
};

exports.create = (req, res) => {
    if (req.method) {
        return new Quest(req.body)
            .save((err, quest) => {
                // TODO: handle error
                res.redirect(`/quests/${quest.id}`);
            });
    }
    res.render('createQuest');
};
