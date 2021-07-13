const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: '0oa17cxnn4No03oAI5d7',
    issuer: 'https://dev-68864381.okta.com/oauth2/default',
});

const APP = express();
const PORT = 3003;

// Middleware
APP.use(express.json());

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

APP.use(async (req, res, next) => {
    try {
      if (!req.headers.authorization) throw new Error('Authorization header is required');
      const accessToken = req.headers.authorization.trim().split(' ')[1];
      await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default')
        .then(async jwt => {
            req.authedUserId = jwt.claims.uid
        })
      next();
    } catch (error) {
      next(error.message);
    }
});
  
// Setup our Mongo connection
mongoose.connect('mongodb://localhost:27017/my-notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo :)')
});

const notesController = require('./controllers/notes')
const usersController = require('./controllers/users')
APP.use('/notes', notesController)
APP.use('/users', usersController)

APP.listen(PORT, () => {
    console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})