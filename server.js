const path = require('path');
const express = require('express');

require('dotenv').config();

const app = express();
const publicPath = path.resolve(__dirname);
const port = process.env.PORT || 3000; // For Heroku

app.use(express.static(publicPath));

const request = require('request');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const authOptions = {
  url: 'https://api.lufthansa.com/v1/oauth/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

let token;

request.post(authOptions, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    token = body.access_token;
    console.log(token)
  }
});

app.get('/token', (req, res) => {
  res.send({ access_token: token })
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
