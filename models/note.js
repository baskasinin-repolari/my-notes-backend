const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
    body: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema)