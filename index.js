'use strict';

require('dotenv-expand')(require('dotenv').config());

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);
const recaptcha = require('express-recaptcha');

const connectToDb = require('./db/connect');
const hbsHelpers = require('./utils/hbs-helpers');
const error = require('./middlewares/error');
const captchaSettings = require('./configs/captcha');

recaptcha.init(captchaSettings.siteKey, captchaSettings.secretKey, {theme: 'dark'});

const session = require('express-session');
const passport = require('./passport.config');

const app = express();
const port = process.env.PORT || 8080;

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'blocks');
const pagesDir = path.join(viewsDir, 'pages');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', pagesDir);
hbsUtils.registerPartials(partialsDir);
hbsHelpers(hbs);

app.use(express.static(publicDir));
hbsUtils.registerWatchedPartials(partialsDir);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(error.middleware(console.error));
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middlewares/common-data'));
require('./routes')(app);

app.use(error.server(console.error));

connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.info(`Server started on ${port}`);
            if (process.env.NODE_ENV !== 'production') {
                console.info(`Open http://localhost:${port}/ to view service`);
            }
        });
    })
    .catch(err => console.error('Unable to connect to database. Application would not start', err));
