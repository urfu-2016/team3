'use strict';

module.exports = app => {
    app.get('/profile', (req, res) => res.send('Here will be user profile page'));
};

