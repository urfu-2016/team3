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
const env = require('./configs/env');

recaptcha.init(env.CAPTCHA_SITE_KEY, env.CAPTCHA_SECRET, {theme: 'dark'});

const session = require('express-session');
const passport = require('./configs/passport.js');

const app = express();
const port = env.PORT;

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'blocks');
const pagesDir = path.join(viewsDir, 'pages');
const publicDir = path.join(__dirname, 'public');

app.set('trust proxy', true);
app.set('view engine', 'hbs');
app.set('views', pagesDir);
hbsUtils.registerPartials(partialsDir);
hbsHelpers(hbs);

let loggerType = "short";
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(publicDir));
    hbsUtils.registerWatchedPartials(partialsDir);
    loggerType = "dev";
}
app.use(logger(loggerType));
app.use(require('./middlewares/forceSsl'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(error.middleware(console.error));
app.use(session({resave: true, saveUninitialized: false, secret: env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middlewares/common-data'));
require('./routes')(app);

app.use(error.server(console.error));

connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.info(`Server started on ${port}`);
            if (env.NODE_ENV !== 'production') {
                console.info(`Open http://localhost:${port}/ to view service`);
            }
        });
    })
    .catch(err => console.error('Unable to connect to database. Application would not start', err));
