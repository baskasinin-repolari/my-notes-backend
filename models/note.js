const Tag = require('../models/tag.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
    body: { type: String, required: true },
    userId: {type: String, required: true},
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, {
    toJSON: { virtuals: true }
});

noteSchema.virtual('body_preview').get(function() {
    return this.body.substring(0, 250);
});

module.exports = mongoose.model('Note', noteSchema);