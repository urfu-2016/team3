'use strict';

require('dotenv-expand')(require('dotenv').config());

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);
const session = require('express-session');

const env = require('./configs/env');
const connectToDb = require('./db/connect');
const hbsHelpers = require('./utils/hbs-helpers');
const error = require('./middlewares/error');
const passport = require('./configs/passport.js');
const upload = require('./configs/multer');
require('./configs/recaptcha');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'blocks');
const pagesDir = path.join(viewsDir, 'pages');
const publicDir = path.join(__dirname, 'public');

app.set('trust proxy', true);
app.set('view engine', 'hbs');
app.set('views', pagesDir);
hbsUtils.registerPartials(partialsDir);
hbsHelpers(hbs);

let loggerType = 'short';
const sessionSettings = {
    resave: true,
    saveUninitialized: false,
    secret: env.SESSION_SECRET,
    cookie: {
        secure: true
    }
};
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(publicDir));
    hbsUtils.registerWatchedPartials(partialsDir);
    loggerType = 'dev';
    sessionSettings.cookie.secure = false;
}

app.use(logger(loggerType));
app.use(require('./middlewares/force-ssl'));
app.use(require('helmet')());
app.use(require('serve-favicon')(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(sessionSettings));
app.use(upload.any());
app.use(require('csurf')());
app.use(require('connect-flash')());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./middlewares/common-data'));
app.use(error.middleware(console.error));
require('./routes')(app);
app.use(error.server(console.error));

const port = env.PORT;
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
