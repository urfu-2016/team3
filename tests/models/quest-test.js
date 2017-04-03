const Quest = require('../../models/quest');
const User = require('../../models/user');
const assert = require('assert');

describe('model: quest', () => {
    beforeEach(() => Quest.remove({}).exec());
    after(() => Quest.remove({}).exec());
    it('save quest', () => {
        const quest = new Quest({
            authorId: new User({}),
            name: 'First Quest',
            description: '012345678901234567890123456789'
        });

        return quest.save()
            .then(savedQuest => {
                assert.equal(savedQuest.likesCount, quest.likesCount);
            });
    });
});
