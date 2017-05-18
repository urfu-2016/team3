'use strict';

const bcrypt = require('bcrypt');
const generateAvatar = require('../../utils/generate-avatar');

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_IN_MILLISECONDS = 10 * 60 * 1000;

module.exports = schema => {
    schema.methods.comparePassword = function (candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    };

    schema.methods.hasAccessToQuest = function (quest) {
        return quest.author.id === this.id || quest.author.toString() === this.id || this.isAdmin;
    };

    schema.methods.isPersistent = function () {
        return this.schema.paths.createdAt === undefined;
    };

    schema.methods.isQuestPassed = function (quest) {
        return this.passedQuests.some(passedQuest => passedQuest.equals(quest) || passedQuest.equals(quest._id));
    };

    schema.methods.isQuestPasses = function (quest) {
        return this.passesQuests.some(passesQuest => passesQuest.equals(quest) || passesQuest.equals(quest._id));
    };

    schema.methods.isQuestLiked = function (quest) {
        return this.likedQuests.some(likedQuest => likedQuest.equals(quest) || likedQuest.equals(quest._id));
    };

    schema.virtual('isLocked').get(function () {
        return Boolean(this.lockUntil && this.lockUntil > Date.now());
    });

    schema.pre('save', function (next) {
        if (!this.avatar) {
            this.avatar = generateAvatar(this.email);
        }
        next();
    });

    const reasons = schema.statics.failedLogin = { // eslint-disable-line no-multi-assign
        NOT_FOUND: 0,
        PASSWORD_INCORRECT: 1,
        MAX_ATTEMPTS_REACHED: 2,
        MAX_ATTEMPTS: 3
    };

    schema.methods.incLoginAttempts = function () {
        if (this.lockUntil && this.lockUntil < Date.now()) {
            return this.update({
                $set: {loginAttempts: 1},
                $unset: {lockUntil: 1}
            }).exec();
        }
        const updates = {$inc: {loginAttempts: 1}};
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
            updates.$set = {lockUntil: Date.now() + LOCK_TIME_IN_MILLISECONDS};
        }
        return this.update(updates).exec();
    };

    schema.statics.getAuthenticated = function (email, password) {
        return this.findOne({email})
            .exec()
            .then(user => {
                if (!user) {
                    const error = new Error();
                    error.reason = reasons.NOT_FOUND;
                    throw error;
                }

                if (user.isLocked) {
                    const reason = user.loginAttempts === MAX_LOGIN_ATTEMPTS
                        ? reasons.MAX_ATTEMPTS_REACHED
                        : reasons.MAX_ATTEMPTS;
                    return user.incLoginAttempts()
                        .then(() => {
                            const error = new Error();
                            error.reason = reason;
                            throw error;
                        });
                }

                return user.comparePassword(password)
                    .then(isMatch => {
                        if (isMatch) {
                            if (!user.loginAttempts && !user.lockUntil) {
                                return user;
                            }
                            const updates = {
                                $set: {loginAttempts: 0},
                                $unset: {lockUntil: 1}
                            };
                            return user.update(updates).exec();
                        }

                        return user.incLoginAttempts()
                            .then(() => {
                                const error = new Error();
                                error.reason = reasons.PASSWORD_INCORRECT;
                                throw error;
                            });
                    });
            });
    };
};
