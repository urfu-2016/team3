'use strict';

const main = require('./../controllers/main');
const commonUrls = require('../utils/url-generator').common;

module.exports = app => {
    app.get(commonUrls.main(), main.main);
    app.get(commonUrls.about(), main.about);
    app.get(commonUrls.error(), main.error)
};
