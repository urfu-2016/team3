const Quest = require('../../models/quest');
const User = require('../../models/user');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: quest', () => {
    beforeEach(() => Quest.remove({}).exec());
    before(() => require('../../db/connect')());
    after(() =>
        Quest.remove({}).exec(() => mongoose.connection.close()));
    it('save quest', () => {
        const quest = new Quest({
            author: new User({}),
            name: 'First Quest',
            description: 'small description with length more than 30 characters',
            likesCount: 5
        });

        return quest.save()
            .then(savedQuest => {
                assert.equal(savedQuest.likesCount, 5);
                assert.equal(savedQuest.nickname, 'First Quest');
            });
    });
});
