const Photo = require('../../models/photo');
const Quest = require('../../models/quest');
const assert = require('assert');

describe('model: photo', () => {
    it('save photo', () => {
        const photo = new Photo({
            url: 'http://....',
            location: 'location',
            description: 'big place',
            questId: new Quest({}),
            successfulTriesCount: 1,
            failedTriesCount: 1
        });
        assert.doesNotThrow(() => {
            photo.save(err => {
                if (err) {
                    throw err;
                }
            });
        });
    });
});
