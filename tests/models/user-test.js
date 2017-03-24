const User = require('../../models/user');
const assert = require('assert');

describe('model: user', () => {
    it('save user', () => {
        const user = new User({
            likedQuests: [],
            name: 'Anton',
            email: 'Anton@gmail.com',
            passwordHash: '3432423sdza',
            passedQuests: [],
            photoStatuses: []
        });
        assert.doesNotThrow(() => {
            user.save(function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
});
