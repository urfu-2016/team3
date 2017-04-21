'use strict';

/**
 * @name hbs-helper
 * @description Helper'ы для Handlebars
 * @version 2.6.3
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

const getArrayItem = (array, index) => {
    if (!(array instanceof Array)) {
        return undefined;
    }
    if (index < 0) {
        index = array.length + index;
    }
    return array[index];
};

/**
 * Получение элемента массива по индексу
 *
 * ```handlebars
 * {{arrayIndex array index}}
 * => array[index]
 * ```
 *
 * @param array - массив
 * @param index - позиция
 */
helpers.arrayIndex = (array, index) => {
    return getArrayItem(array, index);
};

/**
 * Получение первого элемента массива
 *
 * ```handlebars
 * {{arrayFirst array}}
 * => array[0]
 * ```
 *
 * @param array - массив
 * @return первый элемент массива
 */
helpers.arrayFirst = array => {
    return getArrayItem(array, 0);
};

/**
 * Получение последнего элемента массива
 *
 * ```handlebars
 * {{arrayLast array}}
 * => array[array.length - 1]
 * ```
 *
 * @param array - массив
 * @return последний элемент массива
 */
helpers.arrayLast = array => {
    return getArrayItem(array, -1);
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
    const result = items.reduce((res, item) => res || item, null);
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
 * Форматирует многострочный текст
 *
 * ```handlebars
 * {{paragraph text}}
 * ```
 *
 * @param text - многострочный текст
 */
helpers.paragraph = text => {
    if (text) {
        const paragraphs = text.split('\n');
        return `<p>${paragraphs.join('</p>\n<p>')}</p>`;
    }
};

/**
 * Расстановка мягких переноосов
 *
 * {{{shy text}}}
 *
 * @param text - текст
 */
helpers.shy = text => {
    const all = '[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]';
    const vowels = '[аеёиоуыэюя]';
    const consonants = '[бвгджзклмнпрстфхцчшщ]';
    const zn = '[йъь]';

    return [
        new RegExp(`(${zn})(${all}${all})`, 'ig'),
        new RegExp(`(${vowels})(${vowels}${all})`, 'ig'),
        new RegExp(`(${vowels}${consonants})(${consonants}${vowels})`, 'ig'),
        new RegExp(`(${consonants}${vowels})(${consonants}${vowels})`, 'ig'),
        new RegExp(`(${vowels}${consonants})(${consonants}${consonants}${vowels})`, 'ig'),
        new RegExp(`(${vowels}${consonants}${consonants})(${consonants}${consonants}${vowels})`, 'ig')
    ].reduce((res, re) => {
        return res.replace(re, '$1&shy;$2');
    }, text);
};

/**
 * Генерация ссылки на картинку фотографии по id
 *
 * ```handlebars
 * {{photoImageLine photo._id}}
 * ```
 *
 * @param id - id фотографии
 * @return String сгенерированный URL
 */
helpers.photoImageLink = id => `/photos/${id}/image`;

/**
 * Генерация ссылки на квест по id
 *
 * ```handlebars
 * {{questLink quest._id}}
 * ```
 *
 * @param id - id квеста
 * @return String сгенерированный URL
 */
helpers.questLink = id => `/quests/${id}`;

/**
 * Генерация ссылки для публикации квеста по id
 *
 * ```handlebars
 * {{publishQuestLink quest._id}}
 * ```
 *
 * @param id - id квеста
 * @return String сгенерированный URL
 */
helpers.publishQuestLink = id => `/quests/${id}/publish`;

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
