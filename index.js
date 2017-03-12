'use strict';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const app = express();
const port = process.env.PORT || 8080;

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'blocks');
const pagesDir = path.join(viewsDir, 'pages');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', pagesDir);
hbsutils.registerPartials(partialsDir);
if (process.env.NODE_ENV === 'dev') {
    hbsutils.registerWatchedPartials(partialsDir);
}
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */

    console.error(err.stack);
    next();
});

require('./routes')(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */

    console.error(err.stack);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    if (process.env.NODE_ENV === 'dev') {
        console.info(`Open http://localhost:${port}/ to view service`);
    }
});
