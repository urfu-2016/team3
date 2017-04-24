/* eslint-disable no-unused-expressions */
'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;

const quests = require('../../controllers/quests');
const Quest = require('../../models/quest');
const User = require('../../models/user');

describe('quests', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => sandbox.restore());

    it('.list', () => {
        const questsMock = [
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
        ];
        const req = {};
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            then: f => Promise.resolve(f(questsMock))
        };

        const mockFind = sandbox.stub(Quest, 'find');
        mockFind.returns(query);

        return quests.list(req, res)
            .then(() => {
                expect(res.render.calledWith('main', {quests: questsMock})).to.be.true;
            });
    });

    it('.list with error', () => {
        const req = {};
        const res = {};
        res.render = sandbox.stub();
        const expectedError = new Error();
        const query = {
            populate: () => query,
            then: () => Promise.reject(expectedError)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res, err => {
            expect(err).to.equal(expectedError);
        })
            .then(() => {
                expect(res.render.notCalled).to.be.true;
            });
    });
});
