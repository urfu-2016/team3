const Quest = require('../../models/quest');
const User = require('../../models/user');
const assert = require('assert');

describe('model: quest', () => {
    it('save quest', () => {
        const quest = new Quest({
            authorId: new User({}),
            creationDate: '24.03.17',
            name: 'First Quest',
            description: 'small description',
            likesCount: 5,
            passesCount: 2,
            photoIds: []
        });
        assert.doesNotThrow(() => {
            quest.save(function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
});
