'use strict';

const quests = require('../models/data-quest');

module.exports = (req, res) => res.render('main', {
    quests: quests
});
