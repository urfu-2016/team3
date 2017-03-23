'use strict';

module.exports = hbs => {
    hbs.registerHelper('array', (data, options) => {
        let a = JSON.parse(data);
        return options.fn(a);
    });

    hbs.registerHelper('or', (value, defaultValue) => {
        return value || defaultValue;
    });
};
