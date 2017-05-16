/* eslint-disable no-unused-expressions */
'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;
const HttpStatus = require('http-status');

const quests = require('../../../controllers/quests');
const Quest = require('../../../models/quest');
const User = require('../../../models/user');

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
        req.query = {};
        req.flash = sandbox.stub();
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            sort: () => query,
            exec: () => Promise.resolve(questsMock)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res)
            .then(() => {
                expect(res.render.calledWith('main', {quests: questsMock})).to.be.true;
            });
    });

    it('.list with non-published', () => {
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
                published: false
            })
        ];
        const req = {};
        req.query = {};
        req.user = new User();
        req.flash = sandbox.stub();
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            sort: () => query,
            exec: () => Promise.resolve(questsMock)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res)
            .then(() => {
                expect(res.render.calledWith('main', {quests: [questsMock[0]]})).to.be.true;
            });
    });

    it('.list with non-published but own author', () => {
        const user = new User();
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
                author: user,
                creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
                name: `Quest 1`,
                description: 'Description here, must be more than 30 characters',
                likesCount: Math.floor(50 * Math.random()),
                passesCount: 2,
                photos: [],
                published: false
            })
        ];
        const req = {};
        req.query = {};
        req.user = user;
        req.flash = sandbox.stub();
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            sort: () => query,
            exec: () => Promise.resolve(questsMock)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res)
            .then(() => {
                expect(res.render.calledWith('main', {quests: questsMock})).to.be.true;
            });
    });

    it('.list with non-published but under admin', () => {
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
                published: false
            })
        ];
        const req = {};
        req.query = {};
        req.user = new User({isAdmin: true});
        req.flash = sandbox.stub();
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            sort: () => query,
            exec: () => Promise.resolve(questsMock)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res)
            .then(() => {
                expect(res.render.calledWith('main', {quests: questsMock})).to.be.true;
            });
    });

    it('.list with error', () => {
        const req = {};
        req.query = {};
        req.flash = sandbox.stub();
        const res = {};
        res.render = sandbox.stub();
        const expectedError = new Error();
        const query = {
            populate: () => query,
            sort: () => query,
            exec: () => Promise.reject(expectedError)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res, err => {
            expect(err).to.equal(expectedError);
        })
            .then(() => {
                expect(res.render.notCalled).to.be.true;
            });
    });

    it('.list with search query', () => {
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
                published: false
            })
        ];
        const req = {};
        req.query = {};
        req.user = new User({isAdmin: true});
        req.flash = sandbox.stub().returns(['1']);
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            sort: () => query,
            exec: () => Promise.resolve(questsMock)
        };

        sandbox.stub(Quest, 'find').returns(query);

        return quests.list(req, res)
            .then(() => {
                expect(res.render.calledWith('main', {quests: questsMock})).to.be.true;
                expect(Quest.find.calledWith({$text: {$search: '1'}})).to.be.true;
            });
    });

    it('.show published', () => {
        const questMock = new Quest({
            author: new User(),
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: true
        });
        const req = {};
        req.params = {};
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.show(req, res)
            .then(() => {
                expect(res.render.calledWith('quest', {quest: questMock, isPassed: false})).to.be.true;
            });
    });

    it('.show unpublished but it\'s own author', () => {
        const user = new User();
        const questMock = new Quest({
            author: user,
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: false
        });
        const req = {};
        req.params = {};
        req.user = user;
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.show(req, res)
            .then(() => {
                expect(res.render.calledWith('quest', {quest: questMock, isPassed: false})).to.be.true;
            });
    });

    it('.show unpublished but with admin user', () => {
        const questMock = new Quest({
            author: new User(),
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: false
        });
        const req = {};
        req.params = {};
        req.user = new User({
            isAdmin: true
        });
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.show(req, res)
            .then(() => {
                expect(res.render.calledWith('quest', {quest: questMock, isPassed: false})).to.be.true;
            });
    });

    it('.show unpublished returns FORBIDDEN', () => {
        const questMock = new Quest({
            author: new User(),
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: false
        });
        const req = {};
        req.params = {};
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.show(req, res, err => {
            expect(err.status).to.equal(HttpStatus.FORBIDDEN);
        })
            .then(() => {
                expect(res.render.notCalled).to.be.true;
            });
    });

    it('.show non existent quest returns NOT_FOUND', () => {
        const questMock = null;
        const req = {};
        req.params = {};
        const res = {};
        res.render = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.show(req, res, err => {
            expect(err.status).to.equal(HttpStatus.NOT_FOUND);
        })
            .then(() => {
                expect(res.render.notCalled).to.be.true;
            });
    });

    it('.publish from author', () => {
        const user = new User();
        const questMock = new Quest({
            author: user,
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: false
        });
        const mockSave = sinon.stub(questMock, 'save').callsFake(() => {
            questMock.published = true;
            return questMock;
        });
        const req = {};
        req.params = {};
        req.user = user;
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.publish(req, res)
            .then(() => {
                expect(mockSave.called).to.be.true;
                expect(questMock.published).to.be.true;
                expect(res.redirect.called).to.be.true;
            });
    });

    it('.publish from not author returns FORBIDDEN', () => {
        const questMock = new Quest({
            author: new User(),
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: false
        });
        const mockSave = sinon.stub(questMock, 'save');
        const req = {};
        req.params = {};
        req.user = new User();
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.publish(req, res, err => {
            expect(err.status).to.equal(HttpStatus.FORBIDDEN);
        })
            .then(() => {
                expect(mockSave.called).to.be.false;
                expect(questMock.published).to.be.false;
                expect(res.redirect.called).to.be.false;
            });
    });

    it('.publish on non existent quest returns NOT_FOUND', () => {
        const questMock = null;
        const req = {};
        req.params = {};
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        const mockFind = sandbox.stub(Quest, 'findById');
        mockFind.returns(query);

        return quests.publish(req, res, err => {
            expect(err.status).to.equal(HttpStatus.NOT_FOUND);
        })
            .then(() => {
                expect(res.redirect.called).to.be.false;
            });
    });

    it('.create GET', () => {
        const req = {};
        req.recaptcha = 'asd';
        req.method = 'GET';
        const res = {};
        res.render = sandbox.stub();
        quests.create(req, res);
        expect(res.render.calledWith('createQuest', {recaptcha: req.recaptcha})).to.be.true;
    });

    it('.create POST', () => {
        const user = new User();
        const req = {};
        req.user = user;
        req.method = 'POST';
        req.body = {};
        const res = {};
        res.redirect = sandbox.stub();

        sandbox.stub(Quest.prototype, 'save').callsFake(() =>
            Promise.resolve(new Quest({
                name: 'asdqwsda',
                description: 'asdasasdasasdasasdasasdasasdasasdasasdas',
                author: user
            }))
        );

        return quests.create(req, res)
            .then(() => {
                expect(res.redirect.called).to.be.true;
            });
    });

    it('.create POST cannot save', () => {
        const expectedError = new Error();
        const user = new User();
        const req = {};
        req.user = user;
        req.method = 'POST';
        req.body = {};
        const res = {};
        res.redirect = sandbox.stub();

        sandbox.stub(Quest.prototype, 'save').callsFake(() =>
            Promise.reject(expectedError)
        );

        return quests.create(req, res, err => {
            expect(err).to.equal(expectedError);
        })
            .then(() => {
                expect(res.redirect.called).to.be.false;
            });
    });

    it('.createComment', () => {
        const user = new User();
        const questMock = new Quest({
            author: user,
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            published: true
        });
        const mockSave = sinon.stub(questMock, 'save').callsFake(() => Promise.resolve(questMock));
        const req = {};
        req.params = {};
        req.body = {
            text: 'asd'
        };
        req.user = user;
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        sandbox.stub(Quest, 'findById').returns(query);

        return quests.createComment(req, res)
            .then(() => {
                expect(questMock.comments.length).to.equal(1);
                expect(mockSave.called).to.be.true;
                expect(res.redirect.called).to.be.true;
            });
    });

    it('.createComment on non existent quest returns NOT_FOUND', () => {
        const user = new User();
        const questMock = null;
        const req = {};
        req.params = {};
        req.user = user;
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(questMock)
        };

        sandbox.stub(Quest, 'findById').returns(query);

        return quests.createComment(req, res, err => {
            expect(err.status).to.equal(HttpStatus.NOT_FOUND);
        })
            .then(() => {
                expect(res.redirect.notCalled).to.be.true;
            });
    });
});
