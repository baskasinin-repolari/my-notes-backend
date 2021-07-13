<h2> My Notes App API </h2>
This is an API for a note app built with Node.js, Express and MongoDB. The API is public and any one that has a valid OKTA JWT token can use its supported endpoints. The token must be passed through the headers as a bearer token for all requests.

At its core the app supports adding/deleting/updating notes. All notes are related to the authenticated user. Also, notes can have multiple tags, which just like notes are visible (related) only to the authenticated user.

<h4> Demo: </h4>

[heroky deployment](https://herokuapp.com/)

The above link will take you to our app on Heroku. However, I recommend using the [front-end](link to front end deployment goes ehere) app for a better testing experience. 

<h4>The core technologies:</h4>

- Node.js
- Express
- MongoDB

<h4> Third party API:</h4>

- Okta Auth: https://developer.okta.com/


<h4> WPI / Future Improvements: </h4>

- Implement searching
- Add /tag endpoint for filtering
- Fix a bug related to tags: a tag may remain in the database after updating notes and that tag is not present in any other note

