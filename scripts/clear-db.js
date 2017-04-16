'use strict';

const Quest = require('../models/quest');
const Photo = require('../models/photo');
const UserFolower = require('../models/user_follower');
const User = require('../models/user');
const mongoose = require('mongoose');

require('../db/connect')()
    .then(() => {
        return Promise.all([
            User.remove({}).exec(),
            Quest.remove({}).exec(),
            Photo.remove({}).exec(),
            UserFolower.remove({}).exec()
        ]);
    })
    .then(() => {
        mongoose.connection.close();
    });
