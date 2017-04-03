const Photo = require('../../models/photo');
const Quest = require('../../models/quest');
const assert = require('assert');

describe('model: photo', () => {
    beforeEach(() => Photo.remove({}).exec());
    after(() => Photo.remove({}).exec());
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
