const UserFollower = require('../../models/user_follower');
const User = require('../../models/user');
const assert = require('assert');
const mongoose = require('mongoose');

describe('model: userFollower', () => {
    beforeEach(() => UserFollower.remove({}).exec());
    before(() => require('../../models/connection')());
    after(() =>
        UserFollower.remove({}).exec()
            .then(() => mongoose.connection.close())
            .catch(() => mongoose.connection.close()));
    it('save userFollower', () => {
        const userFollower = new UserFollower({
            userId: new User({}),
            followedUserId: new User({})
        });

        return userFollower.save()
            .then(savedUserFollower => assert.equal(savedUserFollower.userId, userFollower.userId));
    });
});
