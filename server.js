// dependencies and imports

// the Twitter API has a streaming method that would allow me to continuously receive data without having to ping it every time

// for multiple stock streams
  // get /stocks/subscribe/:stock
    // 
    // TODO: confirm that Socket.io is allowed in this capstone, not just RESTful

    // graph price changes in correspondence with sentiment changes
    // socket in component - timeline of two streams of info in one socket
      // find streaming stock price API


      // var stream = client.stream('statuses/filter', {track: 'javascript'});
      // stream.on('data', function(event) {
      //   console.log(event && event.text);
      // });

      // server needs to talk to Twitter
        // server then processes data, feeds to client

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const Sentiment = require('sentiment');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

const {CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET} = require('./config');

const twitter = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
});

const sentiment = new Sentiment();

const stream = twitter.stream('statuses/filter', {track: '$AAPL'});
  stream.on('data', function(event) {
    console.log(event && event.text);
    const sentimentScore = sentiment.analyze(event.text).score;
    console.log();
});

stream.on('error', function(error) {
  throw error;
});