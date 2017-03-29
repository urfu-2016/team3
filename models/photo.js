var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var photoSchema = new Schema({
    url: String,
    location: {longitude: {type: Number, index: true}, latitude: {type: Number, index: true}},
    description: String,
    questId: {type: ObjectId, ref: 'Quest', index: true},
    successfulTriesCount: Number,
    failedTriesCount: Number
});

module.exports = mongoose.model('Photo', photoSchema);
