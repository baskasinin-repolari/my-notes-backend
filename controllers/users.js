const express = require('express')
const users = express.Router()

const User = require('../models/user')

// Create route
users.post('/', (req, res) => {
    if (req.body.oktaUID != req.authedUserId) {
        res.status(400).json({ error: "Mismatching information" })
    } else {
        const query = { oktaUID: req.authedUserId } 
        console.log(query)
        console.log(req.body)
        User.findOneAndUpdate(query, req.body, { upsert: true, new: true }, (err, updatedUser) => {
            if (err) {
                // Return error as json
                res.status(400).json({ error: err.message })
            }
            console.log(updatedUser)
            // Return updated note
            res.status(200).json(updatedUser)
        })
    }
})

module.exports = users;