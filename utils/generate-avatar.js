'use strict';

const Identicon = require('identicon.js');
const crypto = require('crypto');

module.exports = uniqueUserId =>
    `data:image/png;base64,${new Identicon(crypto.createHash('md5').update(uniqueUserId).digest('hex'), 200)}`;
