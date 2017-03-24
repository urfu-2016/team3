'use strict';

const Quest = require('../models/quest');

exports.list = (req, res) => {
    const quests = Quest.findAll();

    res.render('main', Object.assign({quests: quests}, res.locals));
};

exports.show = (res, req) => {
    const id = req.params.id;
    const quest = Quest.findById(id);

    if (quest) {
        res.render('quest', Object.assign({quest: quest}, res.locals));
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
    res.render('createQuest', Object.assign({}, res.locals));
};
