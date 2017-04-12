'use strict';

const Quest = require('../models/quest');
const HttpStatus = require('http-status');

exports.list = (req, res, next) => {
    Quest.find({})
        .then(quests => res.render('main', {quests}))
        .catch(next);
};

exports.show = (req, res, next) => {
    const id = req.params.id;
    Quest.findById(id)
        .populate('photos')
        .then(quest => {
            if (!quest) {
                return res.status(HttpStatus.NOT_FOUND).render('404');
            }
            if (quest.published || (req.user && (quest.author === req.user._id || req.user.isAdmin))) {
                return res.render('quest', {quest});
            }

            return res.sendStatus(HttpStatus.FORBIDDEN);
        })
        .catch(next);
};

exports.publish = (req, res, next) => {
    Quest
        .findByIdAndUpdate(
            req.params.id,
            {$set: {published: true}},
            {safe: true, upsert: true, new: true}
        )
        .exec()
        .then(quest => res.redirect(`/quests/${quest.id}`))
        .catch(next);
};

exports.create = (req, res, next) => {
    if (req.method === 'POST') {
        if (req.recaptcha.error) {
            console.error('ReCaptcha error', req.recaptcha.error);
            return res.redirect('/quests/create');
        }
        return new Quest({
            name: req.body.name,
            description: req.body.description,
            author: req.user
        })
            .save()
            .then(quest => res.redirect(`/quests/${quest.id}`))
            .catch(next);
    }
    res.render('createQuest', {captcha: req.recaptcha});
};
