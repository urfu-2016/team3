'use strict';

/**
 * @name hbs-helper
 * @description Helper'ы для Handlebars
 * @version 2.0.1
 */

const helpers = {};

/**
 * Создание массива
 *
 * ```handlebars
 * {{#array item1 item2 ...}}
 *   {{#each this}}
 *     ...
 *   {{/each}}
 * {{/array}}
 * => [item1, item2, ...]
 * ```
 *
 * @param items - список элементов
 * @return блок с переданным в него созданным массивом
 */
helpers.array = (...items) => {
    const options = items.pop();
    return options.fn(items.map(item => {
        try {
            return JSON.parse(item);
        } catch (err) {
            return item;
        }
    }));
};

/**
 * Логическое ИЛИ
 *
 * ```handlebars
 * {{or item1 item2 ...}}
 * => item1 || item 2 || ...
 * ```
 *
 * @param items - список элементов
 * @return блок с переданным в него результатом операции либо сам результат
 */
helpers.or = (...items) => {
    const options = items.pop();
    let result = items.shift();
    result = items.reduce((res, item) => {
        return res || item;
    }, result);
    return 'fn' in options ? options.fn(result) : result;
};

/**
 * Добавляет конструкцию вида:
 *   if (a === b) ...
 *   else ...
 *
 * ```handlebars
 * {{#ifEqual item1 item2}}
 *   {{! item1 === item2}}
 * {{else}}
 *   {{! item1 !== item2}}
 * {{/ifEqual item1 item2}}
 * ```
 *
 * @param first - первый аргумент
 * @param second - второй аргумент
 * @param options - объект внутри тегов {{#ifEqual}}{{/ifEqual}}
 * @param options.fn - блок 'then'
 * @param options.inverse - блок 'else'
 * @return options.fn или options.inverse в зависимости от результата сравнения
 */
helpers.ifEqual = (first, second, options) => {
    return first === second ? options.fn(this) : options.inverse(this);
};

/**
 * Добавляет Helper'ы расширяя стандартный функционал Handlebars
 *
 * @param hbs - Handlebars
 */
module.exports = hbs => {
    Object.keys(helpers).forEach(key => {
        hbs.registerHelper(key, helpers[key]);
    });
};
