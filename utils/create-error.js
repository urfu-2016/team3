'use strict';

const HttpStatus = require('http-status');

module.exports = (message, status) => {
    message = message || HttpStatus[status] || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
    const error = new Error(message);
    error.status = status || HttpStatus.INTERNAL_SERVER_ERROR;
    return error;
};
