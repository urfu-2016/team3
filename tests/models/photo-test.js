const Photo = require('../../models/photo');
const Quest = require('../../models/quest');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: photo', () => {
    beforeEach(() => Photo.remove({}).exec());
    before(() => require('../../db/connect')());
    after(() => Photo.remove({}).exec(() => mongoose.connection.close()));
    it('save photo', () => {
        const photo = new Photo({
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

        return photo.save()
            .then(savedPhoto => {
                assert.equal(savedPhoto.image.data.toString('utf8'), 'Just some bytes');
                assert.equal(savedPhoto.location.latitude, 1);
            });
    });
});

