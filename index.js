'use strict';

require('dotenv-expand')(require('dotenv').config());

const path = require('path');
const connectToDb = require('./models/connection');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);
const hbsHelpers = require('./utils/hbs-helpers');
const error = require('./middlewares/error');

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

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(publicDir));
    hbsUtils.registerWatchedPartials(partialsDir);
}

connectToDb();
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(error.middleware(console.error));
app.use(require('./middlewares/common-data'));

require('./routes')(app);

app.use(error.server(console.error));

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    if (process.env.NODE_ENV !== 'production') {
        console.info(`Open http://localhost:${port}/ to view service`);
    }
});
