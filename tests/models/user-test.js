const User = require('../../models/user');
const assert = require('assert');

describe('model: user', () => {
    beforeEach(() => User.remove({}).exec());
    after(() => User.remove({}).exec());
    it('save user', () => {
        const user = new User({
            likedQuests: [],
            name: 'Anton',
            email: 'Anton@gmail.com',
            passwordHash: '3432423sdza',
            passedQuests: [],
            photoStatuses: []
        });

        return user.save()
            .then(savedUser => assert.equal(savedUser.name, user.name));
    });
});
