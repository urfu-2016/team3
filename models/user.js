const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    likedQuests: [{type: ObjectId, ref: 'Quest', index: true}],
    name: {type: String, index: true},
    email: {type: String, unique: true},
    passwordHash: {type: String, index: true},
    passedQuests: [{type: ObjectId, ref: 'Quest', unique: true}],
    photoStatuses: [{
        photo: {
            type: ObjectId,
            ref: 'Photo',
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    }],
    isAdmin: {type: Boolean, default: false},
    vkID: {type: String, index: true},
    twitterID: {type: String, index: true}
});

userSchema.statics.createPasswordHash = password => {
    return crypto.createHash('sha256', process.env.HASH_SECRET)
        .update(password)
        .digest('hex');
};

userSchema.pre('save', function (next) {
    this.passwordHash = userSchema.statics.createPasswordHash(this.passwordHash);
    next();
});

userSchema.methods.checkPassword = function (password) {
    const passHash = userSchema.statics.createPasswordHash(password);
    return this.passwordHash === passHash;
};

module.exports = mongoose.model('User', userSchema);
