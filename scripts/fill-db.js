'use strict';

const Quest = require('../models/quest');
const User = require('../models/user');
const mongoose = require('mongoose');

require('../db/connect')()
    .then(() => {
        return Promise.all([
            User.remove({}).exec(),
            Quest.remove({}).exec()
        ]);
    })
    .then(() => {
        console.info('Collections successfully cleared');
        const user = new User({
            likedQuests: [],
            nickname: 'John Doe',
            email: 'example@mail.com',
            password: '3432423sdza',
            passedQuests: [],
            photoStatuses: []
        });

        return user.save();
    })
    .then(user => {
        console.info('User created');
        const saves = [];
        for (let i = 0; i < 20; i++) {
            saves.push(new Quest({
                author: user,
                creationDate: new Date(1490776 + Math.floor(300000 * Math.random())),
                name: `Quest ${i}`,
                description: 'Description here, must be more than 30 characters',
                likesCount: Math.floor(50 * Math.random()),
                passesCount: 2,
                photos: [],
                published: true
            }).save());
        }

        return Promise.all(saves);
    })
    .then(() => {
        console.log('Quests created');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err.message, err);
        mongoose.connection.close();
    });
