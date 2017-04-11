'use strict';

const Quest = require('../models/quest');
const User = require('../models/user');
const mongoose = require('mongoose');

const removedHandler = err => {
    if (err) {
        console.error('Collection was not removed', err);
    } else {
        console.info('Removed');
    }
};

require('../db/connect')().then(() => {
    const removePromises = [
        User.remove({}, removedHandler).exec(),
        Quest.remove({}, removedHandler).exec()
    ];

    Promise.all(removePromises)
        .then(() => {
            const user = new User({
                likedQuests: [],
                name: 'John Doe',
                email: 'example@mail.com',
                passwordHash: '3432423sdza',
                passedQuests: [],
                photoStatuses: []
            });

            user.save()
                .then(() => {
                    const saves = [];
                    for (let i = 0; i < 20; i++) {
                        saves.push(new Quest({
                            author: user,
                            creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
                            name: `Quest ${i}`,
                            description: 'Description here, must be more than 30 characters',
                            likesCount: Math.floor(50 * Math.random()),
                            passesCount: 2,
                            photos: []
                        }).save());
                    }

                    Promise.all(saves)
                        .then(() => {
                            console.log('Done');
                            mongoose.connection.close();
                        });
                });
        });
});
