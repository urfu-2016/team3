'use strict';

const urls = require('./url-generator');

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
exports.photoImageLink = urls.photos.image;

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
exports.questLink = urls.quests.specific;

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
exports.publishQuestLink = urls.quests.publish;
