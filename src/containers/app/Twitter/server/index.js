const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

const PORT = process.env.PORT || 3001;

const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/timeline', (req, res) => {
  let name = JSON.parse(req.body);
  var params = { screen_name: name, count: 100, tweet_mode: 'extended' };
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      res.send(tweets);
    } else {
      res.send(error);
    }
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
