'use strict';

/**
 * @name mongoosemulate
 * @description Хак MONGOOSE для локальной работы с MongoDB без необходимости её уставноки
 * @version 1.0.0
 */
class MongoDB {
    constructor() {
        this._db = {};
    }

    /**
     * Сохраняет или обновляет данные в базе
     *
     * @param modelName - название модели
     * @param model - экземпляр модели
     */
    save(modelName, model) {
        const db = this._db[modelName];
        if (db) {
            let data = db.find(item => item._id === model._id);
            if (data) {
                data = model;
            } else {
                this._db[modelName].push(model);
            }
        } else {
            this._db[modelName] = [model];
        }
    }

    /**
     * Поиск данных в БД
     *
     * @param modelName - название модели
     * @param options - параметры фильтрации
     * @return данные из БД
     */
    find(modelName, options) {
        let data = this._db[modelName];
        if (!data) {
            return [];
        }
        Object.keys(options).forEach(field => {
            data = data.filter(item => item[field] === options[field]);
        });
        return data;
    }
}

/**
 * Формирует результат
 *
 * @param data
 * @param callback
 * @return {Promise}
 */
const assembly = (data, callback) => {
    return callback ? callback(null, data) : Promise.resolve(data);
};

/**
 * Хак эмулирующий простейшие операции работы с MONGOOSE
 *
 * @param mongoose
 */
module.exports = mongoose => {
    const db = new MongoDB();

    mongoose.Model.prototype.save = function (callback) {
        db.save(this.constructor.modelName, this);
        return assembly(this, callback);
    };

    mongoose.Model.find = function (conditions, callback) {
        return assembly(db.find(this.modelName, conditions), callback);
    };

    mongoose.Model.findOne = function (conditions, callback) {
        return this.find(conditions).then(data => {
            return assembly(data[0] || null, callback);
        });
    };

    mongoose.Model.findById = function (id, callback) {
        return this.findOne({_id: id}, callback);
    };

    mongoose.Model.count = function (conditions, callback) {
        return this.find(conditions).then(data => {
            return assembly(data.length, callback);
        });
    };
};
