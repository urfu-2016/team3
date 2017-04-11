const Photo = require('../../models/photo');
const Quest = require('../../models/quest');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: photo', () => {
    beforeEach(() => Photo.remove({}).exec());
    before(() => require('../../models/connection')());
    after(() =>
        Photo.remove({}).exec()
            .then(() => mongoose.connection.close())
            .catch(() => mongoose.connection.close()));
    it('save photo', () => {
        const photo = new Photo({
            url: 'http://....',
            location: {
                longitude: 1,
                latitude: 1
            },
            questId: new Quest({})
        });

        return photo.save()
            .then(savedPhoto => assert.equal(savedPhoto.url, photo.url));
    });
});

