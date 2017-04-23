'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;
const {JsMockito} = require('jsmockito');
const {JsHamcrest} = require('jshamcrest');

const quests = require('../../controllers/quests');
const Quest = require('../../models/quest');
const User = require('../../models/user');

describe('quests', () => {
    it('.list', () => {
        const req = sinon.stub();
        const res = sinon.stub();

        const questsMock = JsMockito.mock([
            new Quest({
                author: new User(),
                creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
                name: `Quest 0`,
                description: 'Description here, must be more than 30 characters',
                likesCount: Math.floor(50 * Math.random()),
                passesCount: 2,
                photos: [],
                published: true
            }),
            new Quest({
                author: new User(),
                creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
                name: `Quest 1`,
                description: 'Description here, must be more than 30 characters',
                likesCount: Math.floor(50 * Math.random()),
                passesCount: 2,
                photos: [],
                published: true
            })
        ]);

        const MockQuest = JsMockito.mock(Quest);
        JsMockito.when(questsMock).populate('photos').thenReturn(questsMock);
        JsMockito.when(MockQuest).find({}).thenReturn(questsMock);
        const next = sinon.spy();
        quests.list(req, res, next);

        expect(next.called).to.equal(false);
    });
});
