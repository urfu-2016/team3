const UserFollower = require('../../models/user_follower');
const User = require('../../models/user');
const assert = require('assert');

describe('model: userFollower', () => {
    it('save userFollower', () => {
        const userFollower = new UserFollower({
            userId: new User({}),
            followedUserId: new User({})
        });
        assert.doesNotThrow(() => {
            userFollower.save(function (err) {
                if (err) {
                    throw err;
                }
            });
        });
    });
});
