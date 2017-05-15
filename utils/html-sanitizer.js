'use strict';

/**
 * @name html-sanitizer
 * @description Экранирование 'вредоносных' html-тегов
 * @version 1.0.0
 */

const htmlTags = [
    'script', 'noscript', 'button', 'textarea', 'input',
    'form', 'video', 'img', 'audio', 'style'
].map(item => new RegExp(`<(/?${item}.*?)>`, 'gi'));

const onEvent = / (on.*?=['"].*?['"])/ig;

module.exports = html => {
    return htmlTags.reduce((newText, regExp) => newText.replace(regExp, '&lt;$1&gt;'), html)
        .replace(onEvent, '');
};
