const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
    body: { type: String, required: true },
}, {
    toJSON: { virtuals: true }
});

noteSchema.virtual('body_preview').get(function() {
    return this.body.substring(0, 250);
});

module.exports = mongoose.model('Note', noteSchema)