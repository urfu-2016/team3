'use strict';

exports.NODE_ENV = process.env.NODE_ENV;

exports.VK_ID = process.env.VK_ID;
exports.VK_KEY = process.env.VK_KEY;

exports.TWITTER_KEY = process.env.TWITTER_KEY;
exports.TWITTER_SECRET = process.env.TWITTER_SECRET;

exports.CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
exports.CAPTCHA_SITE_KEY = process.env.CAPTCHA_SITE_KEY || '6LeTGRsUAAAAAGB94uWfJrQIRBohmh5MyuiXnsYq';

exports.PORT = process.env.PORT || 8080;

exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/photo-quest';

exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.COOKIE_SECRET = process.env.COOKIE_SECRET;
