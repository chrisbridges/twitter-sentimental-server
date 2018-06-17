const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);

const morgan = require('morgan');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const Sentiment = require('sentiment');
const {PORT, CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET} = require('./config');

app.use(morgan('common'));
app.use(bodyParser.json());

const twitter = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
});

const sentiment = new Sentiment();

http.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});

// let currentSubscription;

const userRegistry = {};
// UserID (socketID): stream 

function createNewSubscription (symbol, socketID) {
  destroySubscription(socketID); // if there is another stream currently running, kill it
  const stream = twitter.stream('statuses/filter', {track: `${symbol}`});
  userRegistry[socketID] = stream;
  console.log(`New stream added to ${socket.id} registry`);
  // currentSubscription = stream;
	stream.on('data', data => {
    const userImage = data.user.profile_image_url_https;
    const username = data.user.screen_name;
    const tweetText = data.text;
    const analysis = sentiment.analyze(data.text);
    console.log(analysis);
    const sentimentScore = analysis.score;
    const positiveWords = analysis.positive;
    const negativeWords = analysis.negative;
		socket.emit(`symbol-${symbol}`, { sentimentScore, positiveWords, negativeWords, tweet: {text: tweetText, userImage, username} });
	});
}

function destroySubscription (socketID) {
  const currentUserSubscription = userRegistry[socketID];
  // if (currentSubscription) {
  //   currentSubscription.destroy();
  //   console.log('Current Subscription destroyed');
  // }
  if (currentUserSubscription) {
    currentUserSubscription.destroy();
    console.log(`${socketID} subscription destroyed`);
  }
  
  // userRegistry[socketID] = null;
  return;
}

socket.on('connection', (socket) => {
  console.log(`${socket.id} has connected`);
  socket.on('request-symbol', (symbol) => { // is this only going to work for initial connection? Needs to be available when searching for new stock as well
    console.log(`${socket.id} is requesting ${symbol}`);
    createNewSubscription(symbol, socket.id);
  });

  socket.on('disconnect', () => { // this event only fires upon disconnect. Maybe focus on disconnecting from client-side
    console.log(`${socket.id} has disconnected`);
    destroySubscription(socket.id);
  });
});

// socket.id's vary from client to server? Gonna have to only use the server ID. Client would send different ID