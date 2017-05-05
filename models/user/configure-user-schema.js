'use strict';

const bcrypt = require('bcrypt');

module.exports = schema => {
    schema.methods.comparePassword = function (candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    };

    schema.methods.hasAccessToQuest = function (quest) {
        return quest.author.id === this.id || quest.author.toString() === this.id || this.isAdmin;
    };
};
