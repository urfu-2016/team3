'use strict';

const Quest = require('../models/quest');

exports.list = (req, res) => {
    const quests = Quest.find({});

    res.render('main', {quests});
};

exports.show = (res, req) => {
    const id = req.params.id;
    const quest = Quest.findById(id);

    if (quest) {
        res.render('quest', {quest});
    } else {
        res.sendStatus(404);
    }
};

exports.create = (res, req) => {
    if (req.method) {
        const quest = new Quest(req.body);
        quest.save();

        return res.redirect(`/quests/${quest.id}`);
    }
    res.render('createQuest');
};
