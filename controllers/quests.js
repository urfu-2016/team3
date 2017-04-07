'use strict';

const Quest = require('../models/quest');

exports.list = (req, res, next) => {
    Quest.find({})
        .then(quests => res.render('main', {quests}))
        .catch(next);
};

exports.show = (req, res, next) => {
    const id = req.params.id;
    Quest.findById(id)
        .then(quest => {
            if (quest) {
                res.render('quest', {quest});
            } else {
                res.status(404).render('404');
            }
        })
        .catch(next);
};

<<<<<<< ee595b36ba16832199fde771afda71452200c1a2
exports.create = (req, res) => {
    if (req.method === 'POST') {
        if (req.recaptcha.error) {
            console.error('ReCaptcha error', req.recaptcha.error);
            return res.redirect('/quests/create');
        }
=======
exports.publish = (req, res, next) => {
    Quest
        .findByIdAndUpdate(
            req.body.id,
            {$set: {published: true}},
            {safe: true, upsert: true, new: true}
        )
        .exec()
        .then(quest => res.render(`/quests/${quest.id}`))
        .catch(next);
};

exports.create = (req, res, next) => {
    if (req.method) {
>>>>>>> Try to improve user workflow
        return new Quest(req.body)
            .save()
            .then(quest => res.redirect(`/quests/${quest.id}`))
            .catch(next);
    }
    res.render('createQuest', {captcha: req.recaptcha});
};
