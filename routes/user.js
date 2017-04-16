'use strict';

module.exports = app => {
    app.get('/profile', (req, res) => res.send('Here will be user profile page'));

    app.get('/login', (req, res) => res.render('authorization/login'));
    app.get('/registration', (req, res) => res.render('authorization/registration'));
};

