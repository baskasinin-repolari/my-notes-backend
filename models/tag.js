const User = require('../models/user.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const tagSchema = mongoose.Schema({
    name: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Tag', tagSchema);