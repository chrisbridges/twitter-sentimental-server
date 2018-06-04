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
app.use(express.static('public'));
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

const subscriptions = {};

const registry = {};

function addToRegistry (symbol, user) {
	// make sure symbol exists in registry, and user is in the array
	// return true iff the symbol isn't already in the registry
}

function removeFromRegistry(user){
	// remove user from all symbol' array inside registry
	// also perform a cleanup to get rid of any symbol that has an array of length 0
	// returns an array of symbols that are removed from the registry

	// example
	// const r = {
	// 	AAPL: [2],
	// 	AMZN: [2],
	// 	GOOL: [4]
	// }
	// removeFromRegistry(2) => ['AAPL', 'AMZN']
}

function createNewSubscription (symbol) {
  const stream = twitter.stream('statuses/filter', {track: `$${symbol}`});
	stream.on('data', data => {
    console.log(data);
		const analysis = sentiment.analyze(data.text).score;
		socket.emit(`symbol-${symbol}`, { analysis, tweet: data.text });
	})
	// subscriptions[symbol] = sub;
}

function destroySubscription (symbol) {
	delete subscription['symbol'];
}

socket.on('connection', (socket) => {
  // console.log(socket.id);
	// Maybe not (socket ID?) find a way to generate a unique finger print for each frontend user
  console.log(`${socket.id} has connected`);
  socket.on('request-symbol', (symbol) => {
    console.log(`${socket.id} is searching for ${symbol}`);
    // const symbolIsNew = addToRegistry(symbol, user);
    // if (symbolIsNew) {
    createNewSubscription(symbol);
    // }
  });
});

socket.on('disconnect', ({ user }) => {
	const symbolsRemoved = removeFromRegistry(user);
	symbolsRemoved.forEach(symbol => {
		destroySubscription(symbol)
	});
	console.log(`${user.id} has disconnected`);
});