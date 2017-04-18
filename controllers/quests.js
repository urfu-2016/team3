'use strict';

const Quest = require('../models/quest');
const HttpStatus = require('http-status');

exports.list = (req, res, next) => Quest.find({})
    .populate('photos')
    .then(quests => res.render('main', {quests}))
    .catch(next);

exports.show = (req, res, next) =>
    Quest.findById(req.params.id)
        .populate('photos')
        .then(quest => {
            if (!quest) {
                return res.status(HttpStatus.NOT_FOUND).render('404');
            }
            if (quest.published || (req.user && (quest.author === req.user._id || req.user.isAdmin))) {
                return res.render('quest', {quest});
            }

            const err = new Error('You are not allowed to see this quest right now');
            err.status = HttpStatus.FORBIDDEN;
            throw err;
        })
        .catch(next);

exports.publish = (req, res, next) =>
    Quest.findById(req.params.id)
        .then(quest => {
            if (quest.author !== req.user._id) {
                const err = new Error('You are not allowed to modify this quest');
                err.status = HttpStatus.FORBIDDEN;
                throw err;
            }

            quest.published = true;
            return quest.save();
        })
        .then(quest => res.redirect(`/quests/${quest.id}`))
        .catch(next);

exports.create = (req, res, next) => {
    if (req.method === 'POST') {
        if (req.recaptcha.error) {
            console.error('ReCaptcha error', req.recaptcha.error);
            return res.redirect('/quests/create?captchaError=true');
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
