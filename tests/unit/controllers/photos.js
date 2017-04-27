/* eslint-disable no-unused-expressions */
'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;
const HttpStatus = require('http-status');

const photos = require('../../../controllers/photos');
const Photo = require('../../../models/photo');
const Quest = require('../../../models/quest');
const User = require('../../../models/user');

describe('photos', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => sandbox.restore());

    it('.image', () => {
        const mockPhoto = new Photo({
            image: {
                data: Buffer.from('Just some bytes', 'utf8'),
                contentType: 'image/png'
            },
            location: {
                longitude: 1,
                latitude: 1
            },
            quest: new Quest({})
        });
        const req = {};
        req.params = {};
        const res = {};
        res.contentType = sandbox.stub().returns(res);
        res.send = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(mockPhoto)
        };

        sandbox.stub(Photo, 'findById').returns(query);

        return photos.image(req, res)
            .then(() => {
                expect(res.contentType.calledWith(mockPhoto.image.contentType)).to.be.true;
                expect(res.send.calledWith(mockPhoto.image.data)).to.be.true;
            });
    });

    it('.image on non existent photo returns NOT_FOUND', () => {
        const mockPhoto = null;
        const req = {};
        req.params = {};
        const res = {};
        res.contentType = sandbox.stub().returns(res);
        res.sendStatus = sandbox.stub();
        res.send = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(mockPhoto)
        };

        sandbox.stub(Photo, 'findById').returns(query);

        return photos.image(req, res)
            .then(() => {
                expect(res.contentType.called).to.be.false;
                expect(res.send.called).to.be.false;
                expect(res.sendStatus.calledWith(HttpStatus.NOT_FOUND)).to.be.true;
            });
    });

    it('.upload', () => {
        const user = new User();
        const mockQuest = new Quest({
            author: user,
            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
            name: `Quest 1`,
            description: 'Description here, must be more than 30 characters',
            likesCount: Math.floor(50 * Math.random()),
            passesCount: 2,
            photos: [],
            published: false
        });
        const mockPhoto = new Photo({
            image: {
                data: Buffer.from('Just some bytes', 'utf8'),
                contentType: 'image/png'
            },
            location: {
                longitude: 1,
                latitude: 1
            },
            quest: mockQuest
        });
        const req = {};
        req.body = {};
        req.file = {};
        req.user = user;
        const res = {};
        res.redirect = sandbox.stub();
        const questQuery = {
            populate: () => questQuery,
            exec: () => Promise.resolve(mockQuest)
        };
        sandbox.stub(Quest, 'findById').returns(questQuery);
        sandbox.stub(Photo.prototype, 'save').callsFake(() => Promise.resolve(mockPhoto));
        sandbox.stub(mockQuest, 'save').callsFake(() => Promise.resolve(mockQuest));
        return photos.upload(req, res)
            .then(() => {
                expect(res.redirect.called).to.be.true;
                expect(mockQuest.photos.length).to.equal(1);
            });
    });

    it('.upload with non existent quest returns NOT_FOUND', () => {
        const mockQuest = null;
        const req = {};
        req.body = {};
        const res = {};
        res.redirect = sandbox.stub();
        const questQuery = {
            populate: () => questQuery,
            exec: () => Promise.resolve(mockQuest)
        };
        sandbox.stub(Quest, 'findById').returns(questQuery);
        return photos.upload(req, res, err => {
            expect(err.status).to.equal(HttpStatus.NOT_FOUND);
        })
            .then(() => {
                expect(res.redirect.called).to.be.false;
            });
    });

    it('.checkin successful', () => {
        const mockPhoto = new Photo({
            image: {
                data: Buffer.from('Just some bytes', 'utf8'),
                contentType: 'image/png'
            },
            location: {
                longitude: 1,
                latitude: 1
            },
            quest: new Quest({published: true})
        });
        const req = {};
        req.body = {
            longitude: 1,
            latitude: 1
        };
        req.file = {};
        req.params = {};
        req.user = new User({});
        req.flash = sandbox.spy();
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(mockPhoto)
        };
        sandbox.stub(Photo, 'findById').returns(query);
        sandbox.stub(req.user, 'save').returns(Promise.resolve(req.user));
        return photos.checkin(req, res)
            .then(() => {
                expect(res.redirect.called).to.be.true;
                expect(req.user.photoStatuses[0].status).to.be.true;
                expect(req.flash.called).to.be.true;
            });
    });

    it('.checkin failed', () => {
        const mockPhoto = new Photo({
            image: {
                data: Buffer.from('Just some bytes', 'utf8'),
                contentType: 'image/png'
            },
            location: {
                longitude: 1,
                latitude: 1
            },
            quest: new Quest({published: true})
        });
        const req = {};
        req.body = {
            longitude: 25,
            latitude: 1
        };
        req.file = {};
        req.params = {};
        req.user = new User({});
        req.flash = sandbox.spy();
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(mockPhoto)
        };
        sandbox.stub(Photo, 'findById').returns(query);
        sandbox.stub(req.user, 'save').returns(Promise.resolve(req.user));
        return photos.checkin(req, res)
            .then(() => {
                expect(res.redirect.called).to.be.true;
                expect(req.user.photoStatuses[0].status).to.be.false;
                expect(req.flash.called).to.be.true;
            });
    });

    it('.checkin with non existent photo returns NOT_FOUND', () => {
        const mockPhoto = null;
        const req = {};
        req.body = {
            longitude: 25,
            latitude: 1
        };
        req.file = {};
        req.params = {};
        req.user = new User({});
        const res = {};
        res.redirect = sandbox.stub();
        const query = {
            populate: () => query,
            exec: () => Promise.resolve(mockPhoto)
        };
        sandbox.stub(Photo, 'findById').returns(query);
        return photos.checkin(req, res, err => {
            expect(err.status).to.equal(HttpStatus.NOT_FOUND);
        })
            .then(() => {
                expect(res.redirect.called).to.be.false;
                expect(req.user.photoStatuses.length).to.equal(0);
            });
    });
});
