const Note = require('../models/note.js');
const Tag = require('../models/tag.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    oktaUID: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

module.exports = mongoose.model('User', userSchema);