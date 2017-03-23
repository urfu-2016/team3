'use strict';

const quests = require('../models/quest');

module.exports = (req, res) => res.render('main', {
    quests: quests
});
