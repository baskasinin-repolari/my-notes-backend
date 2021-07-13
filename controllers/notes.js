const express = require('express')
const notes = express.Router()

const Note = require('../models/note')
const User = require('../models/user')
const Tag = require('../models/tag')

async function insertTags(tags) {
    let queries = []
    tags.forEach(tag => {
        queries.push(Tag.findOneAndUpdate(tag, tag, { upsert: true, new: true }, (err, updatedTag) => {
            if (!err) {
                console.log(updatedTag)
                return updatedTag
            } else { 
                return null
            }
        }))
    })
    
    return tagsResult = await Promise.all(queries)
};


// Get All Notes route
notes.get('/', (req, res) => {
    Note.
    find({})
    .where('userId').equals(req.authedUserId)
    .populate('tags')
    .sort({date: 'desc'})
    .exec((err, foundNotes) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundNotes)
    })
});

// Create route
notes.post('/', (req, res) => {
    User.findOne({})
    .where('oktaUID').equals(req.authedUserId)
    .exec((err, foundUser) => {
        if (err) {
            res.status(400).json({ error: "could not find user" })
        } else {
            req.body.userId = req.authedUserId
            let tags = []
            req.body.tags.forEach( aTag =>  {
                tagName = aTag.name.toLowerCase()
                let tag = { name: tagName, user: foundUser._id }
                tags.push(tag)
            })

            insertTags(tags).then(insertedTags => {
                let tagIds = []
                insertedTags.forEach( tag => {
                    tagIds.push(tag._id)
                })
                req.body.tags = tagIds
                Note.create(req.body, (err, createdNote) => {
                    if (err) {
                        // Return error as json
                        res.status(400).json({ error: err.message })
                    }
                    // Return created note
                    console.log(createdNote)
                    res.status(200).json(createdNote)
                })
            })
        }
    })
})

// Get single route
notes.get('/:id', (req, res) => {
    Note.findById(req.params.id)
    .where('userId').equals(req.authedUserId)
    .populate('tags')
    .exec((err, foundNote) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        // Return found note
        res.status(200).json(foundNote)
    })
})

// Update route
notes.put('/:id', (req, res) => {
    req.body['date'] = Date.now()
    req.body.userId = req.authedUserId
    const query = { _id: req.params.id, userId: req.authedUserId }
    let tags = []
    req.body.tags.forEach(tag => {
        if ("_id" in tag) {
            tags.push(tag._id)
        }
    })
    req.body.tags = tags
    Note.findOneAndUpdate(query, req.body, { upsert: true, new: true }, (err, updatedNote) => {
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