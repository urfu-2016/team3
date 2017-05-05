'use strict';

module.exports = req => {
    const app = req.app;
    const trustProxy = app && app.get && app.get('trust proxy');

    const proto = (req.headers['x-forwarded-proto'] || '').toLowerCase();
    const tls = req.connection.encrypted || (trustProxy && proto.split(/\s*,\s*/)[0] === 'https');
    const host = (trustProxy && req.headers['x-forwarded-host']) || req.headers.host;
    const protocol = tls ? 'https' : 'http';
    return `${protocol}://${host}`;
};
