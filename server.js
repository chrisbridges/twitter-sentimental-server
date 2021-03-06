const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const cors = require('cors');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const Sentiment = require('sentiment');
const {PORT, CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET} = require('./config');

app.use(cors());

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

// registry for user socket IDs, and the twitter instances they're currently subscribed to
const userRegistry = {};
// subscribe user to tweets they searched for
function createNewSubscription (symbol, socketID) {
  destroySubscription(socketID); // if there is another stream currently running, kill it
  const stream = twitter.stream('statuses/filter', {track: `${symbol}`});
  userRegistry[socketID] = stream;
  console.log(`New stream added to ${socketID} registry`);
	stream.on('data', data => {
    const userImage = data.user.profile_image_url_https;
    const username = data.user.screen_name;
    const tweetText = data.text;
    const analysis = sentiment.analyze(data.text);
    const sentimentScore = analysis.score;
    const positiveWords = analysis.positive;
    const negativeWords = analysis.negative;
    // send analysis and twitter user info along with tweet
		socket.emit(`symbol-${symbol}`, { sentimentScore, positiveWords, negativeWords, tweet: {text: tweetText, userImage, username} });
	});
}
// remove subscription for user to either subscribe to new stream or upon user disconnect
function destroySubscription (socketID) {
  const currentUserSubscription = userRegistry[socketID];

  if (currentUserSubscription) {
    currentUserSubscription.destroy();
    console.log(`${socketID} subscription destroyed`);
  }
  
  return;
}
// logic for new user connection && disconnect
socket.on('connection', (socket) => {
  console.log(`${socket.id} has connected`);
  socket.on('request-symbol', (symbol) => { 
    console.log(`${socket.id} is requesting ${symbol}`);
    createNewSubscription(symbol, socket.id);
  });

  socket.on('disconnect', () => { 
    console.log(`${socket.id} has disconnected`);
    destroySubscription(socket.id);
  });
});