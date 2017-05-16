'use strict';

const Photo = require('../models/photo');
const Quest = require('../models/quest');
const HttpStatus = require('http-status');
const htmlSanitizer = require('sanitize-html');
const urls = require('../utils/url-generator');
const flashConstants = require('../configs/flash-constants');
const createError = require('../utils/create-error');

const mongodb = require('mongodb');

const SORTING_FIELDS = ['creationDate', 'likesCount'];

function extractFieldName(sortBy) {
    if (sortBy.startsWith('-')) {
        return sortBy.substring(1);
    }
    return sortBy;
}

const sanitizeHtml = html => {
    return htmlSanitizer(html, {
        allowedTags: ['b', 'i', 'u', 'div', 'li', 'ul', 'ol', 'span', 'br', 'img'],
        allowedAttributes: {
            img: ['src', 'data-type']
        }
    });
};

exports.list = (req, res, next) => {
    let query = {};
    const searchQuery = req.flash(flashConstants.SEARCH_QUERY);
    if (Array.isArray(searchQuery) && searchQuery.length) {
        query = {$text: {$search: searchQuery[searchQuery.length - 1]}};
    }
    return Quest.find(query)
        .sort(req.query.sortBy && ~SORTING_FIELDS.indexOf(extractFieldName(req.query.sortBy))
            ? req.query.sortBy
            : '-creationDate')
        .populate('photos author')
        .exec()
        .then(quests =>
            quests.filter(quest =>
                quest.published || quest.isAccessibleToUser(req.user)
            )
        )
        .then(quests => res.render('main', {quests}))
        .catch(next);
};

exports.show = (req, res, next) =>
    Quest.findById(req.params.id)
        .populate('photos author comments.author')
        .exec()
        .then(quest => {
            if (!quest) {
                throw createError(`There is no quest with id ${req.params.id}`, HttpStatus.NOT_FOUND);
            }
            const clientIsAllowedToSeeQuest = quest.published || quest.isAccessibleToUser(req.user);
            if (!clientIsAllowedToSeeQuest) {
                throw createError('You are not allowed to see this quest right now', HttpStatus.FORBIDDEN);
            }
            if (req.user) {
                req.user.isAuthor = quest.author.id === req.user.id;
            }
            quest.photos.forEach(photo => {
                const photoStatus = req.user &&
                    req.user.photoStatuses.find(photoStatus => photoStatus.photo.equals(photo._id));
                photo.status = photoStatus ? photoStatus.status : 'none';
            });
            res.render('quest', {quest, isPassed: Boolean(req.user) && req.user.isQuestPassed(quest)});
        })
        .catch(next);

exports.search = (req, res) => {
    req.flash(flashConstants.SEARCH_QUERY, req.body.query);
    res.redirect(urls.quests.root());
};

exports.publish = (req, res, next) =>
    Quest.findById(req.params.id)
        .exec()
        .then(quest => {
            if (!quest) {
                throw createError(`There is no quest with id ${req.params.id}`, HttpStatus.NOT_FOUND);
            }
            if (!quest.isAccessibleToUser(req.user)) {
                throw createError('You are not allowed to modify this quest', HttpStatus.FORBIDDEN);
            }

            quest.published = true;
            return quest.save();
        })
        .then(quest => res.redirect(urls.quests.specific(quest.id)))
        .catch(next);

exports.create = (req, res, next) => {
    if (req.method === 'POST') {
        return new Quest({
            name: req.body.name,
            description: sanitizeHtml(req.body.description),
            author: req.user
        })
            .save()
            .then(quest => res.redirect(urls.quests.specific(quest.id)))
            .catch(next);
    }
    res.render('createQuest', {recaptcha: req.recaptcha});
};

exports.createComment = (req, res, next) =>
    Quest.findById(req.params.id)
        .exec()
        .then(quest => {
            if (!quest) {
                throw createError(`There is no quest with id ${req.params.id}`, HttpStatus.NOT_FOUND);
            }

            if (!quest.published) {
                throw createError(`Quest with id: ${req.body.questId} is not published yet. Commenting is disabled`,
                    HttpStatus.FORBIDDEN);
            }

            quest.comments.push({text: sanitizeHtml(req.body.text), author: req.user});
            return quest.save();
        })
        .then(quest => res.redirect(urls.quests.specific(quest.id)))
        .catch(next);

exports.remove = (req, res, next) =>
    Quest.findById(req.params.id)
        .then(quest => {
            if (!quest.isAccessibleToUser(req.user)) {
                const err = new Error('You are not allowed to delete this quest');
                err.status = HttpStatus.FORBIDDEN;
                throw err;
            }

            return Photo.remove({quest: quest});
        })
        .then(() => Quest.deleteOne({_id: new mongodb.ObjectID(req.params.id)}))
        .then(() => res.redirect(urls.common.main()))
        .catch(next);

exports.edit = (req, res, next) =>
    Quest.findById(req.params.id)
        .then(quest => {
            if (!quest.isAccessibleToUser(req.user)) {
                const err = new Error('You are not allowed to modify this quest');
                err.status = HttpStatus.FORBIDDEN;
                throw err;
            }

            if (req.body.name) {
                quest.name = req.body.name;
            }
            if (req.body.description) {
                quest.description = req.body.description;
            }

            return quest.save();
        })
        .then(() => {
            res.sendStatus(HttpStatus.OK);
        })
        .catch(next);
