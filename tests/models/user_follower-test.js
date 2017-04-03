const UserFollower = require('../../models/user_follower');
const User = require('../../models/user');
const assert = require('assert');

describe('model: userFollower', () => {
    beforeEach(() => UserFollower.remove({}).exec());
    after(() => UserFollower.remove({}).exec());
    it('save userFollower', () => {
        const userFollower = new UserFollower({
            userId: new User({}),
            followedUserId: new User({})
        });

        return userFollower.save()
            .then(savedUserFollower => assert.equal(savedUserFollower.userId, userFollower.userId));
    });
});
