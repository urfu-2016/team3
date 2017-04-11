const Quest = require('../../models/quest');
const User = require('../../models/user');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: quest', () => {
    beforeEach(() => Quest.remove({}).exec());
    before(() => require('../../models/connection')());
    after(() =>
        Quest.remove({}).exec()
            .then(() => mongoose.connection.close())
            .catch(() => mongoose.connection.close()));
    it('save quest', () => {
        const quest = new Quest({
            authorId: new User({}),
            name: 'First Quest',
            description: 'small description',
            likesCount: 5,
            passesCount: 2,
            photos: []
        });

        return quest.save()
            .then(savedQuest => {
                assert.equal(savedQuest.likesCount, quest.likesCount);
            });
    });
});
