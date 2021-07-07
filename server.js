const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const APP = express();
const PORT = 3003;

// Middleware
APP.use(express.json());

// Setup our Mongo connection
mongoose.connect('mongodb://localhost:27017/my-notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo :)')
});

// Configure the cors middleware for other requests
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

APP.use(cors(corsOptions))

const notesController = require('./controllers/my-notes')
APP.use('/my-notes', notesController)

APP.listen(PORT, () => {
    console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})