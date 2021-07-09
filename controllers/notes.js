const express = require('express')
const notes = express.Router()

const Note = require('../models/note')

// Get All Notes route
notes.get('/', (req, res) => {
    Note.find({}).sort({date: 'desc'}).exec((err, foundNotes) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundNotes)
    })
});

// Create route
notes.post('/', (req, res) => {
    Note.create(req.body, (err, createdNote) => {
        if (err) {
            // Return error as json
            res.status(400).json({ error: err.message })
        }
        // Return created note
        res.status(200).json(createdNote)
    })
})

// Get single route
notes.get('/:id', (req, res) => {
    Note.findById(req.params.id, (err, foundNote) => {
        if (err) {
            // Return error as json
            res.status(400).json({ error: err.message })
        }
        // Return updated note
        res.status(200).json(foundNote)
    })
})

// Update route
notes.put('/:id', (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedNote) => {
        if (err) {
            // Return error as json
            res.status(400).json({ error: err.message })
        }
        // Return updated note
        res.status(200).json(updatedNote)
    })
})

// Delete route
notes.delete('/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, deletedNote) => {
        if (err) {
            // Return error as json
            res.status(400).json({ error: err.message })
        }
        // Return deleted note
        res.status(200).json({
            'deleted_note': deletedNote
        })
    })
})

module.exports = notes;