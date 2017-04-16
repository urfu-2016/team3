const User = require('../../models/user');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: user', () => {
    beforeEach(() => User.remove({}).exec());
    before(() => require('../../db/connect')());
    after(() =>
        User.remove({}).exec(() => mongoose.connection.close()));
    it('save user', () => {
        const user = new User({
            likedQuests: [],
            name: 'Anton',
            email: 'Anton@gmail.com',
            password: '3432423sdza',
            passedQuests: [],
            photoStatuses: []
        });

        return user.save()
            .then(savedUser => assert.equal(savedUser.name, user.name));
    });
});
