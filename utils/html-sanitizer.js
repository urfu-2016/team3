'use strict';

const sanitizeHtml = require('sanitize-html');

module.exports = html => {
    return sanitizeHtml(html, {
        allowedTags: ['b', 'i', 'u', 'div', 'li', 'ul', 'ol', 'span', 'br']
    });
};
