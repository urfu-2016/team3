'use strict';

/**
 * Possible values:
 *  - 'production'
 * required: false
 * @type {String}
 */
exports.NODE_ENV = process.env.NODE_ENV;

/**
 * The id of the VK app
 * required: true
 * @type {String|Number}
 */
exports.VK_ID = process.env.VK_ID;
/**
 * The secret key of the VK app
 * required: true
 * @type {String}
 */
exports.VK_KEY = process.env.VK_KEY;

/**
 * The key of the Twitter app
 * required: true
 * @type {String}
 */
exports.TWITTER_KEY = process.env.TWITTER_KEY;
/**
 * The secret key of the Twitter app
 * required: true
 * @type {String}
 */
exports.TWITTER_SECRET = process.env.TWITTER_SECRET;

/**
 * The secret key of the reCaptcha
 * required: true
 * @type {String}
 */
exports.CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
/**
 * The site key of the reCaptcha
 * required: true
 * @type {String}
 */
exports.CAPTCHA_SITE_KEY = process.env.CAPTCHA_SITE_KEY || '6LeTGRsUAAAAAGB94uWfJrQIRBohmh5MyuiXnsYq';

/**
 * Port to start app on
 * required: false
 * @type {String|Number}
 */
exports.PORT = process.env.PORT || 8080;

/**
 * URL of the MongoDB used by app
 * required: false
 * @type {String}
 */
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/photo-quest';

/**
 * Random secret used to protect sessions
 * required: true
 * @type {String}
 */
exports.SESSION_SECRET = process.env.SESSION_SECRET;
/**
 * Random secret used to sign cookies
 * required: false (cookies won't be signed
 * @type {String}
 */
exports.COOKIE_SECRET = process.env.COOKIE_SECRET;
