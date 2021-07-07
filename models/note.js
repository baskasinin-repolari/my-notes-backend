const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema)