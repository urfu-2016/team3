'use strict';

const bcrypt = require('bcrypt');

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
    }
};
