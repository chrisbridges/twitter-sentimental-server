// dependencies and imports

// the Twitter API has a streaming method that would allow me to continuously receive data without having to ping it every time

// for multiple stock streams
  // get /stocks/subscribe/:stock
    // 


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
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

http.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('subscribeToTweets', stock => {
    // console.log(`retrieving tweets about ${stock}`);
    // socket.emit('tweets', fetchTweets(stock)); don't want to send tweets upon connection
  });
});

function fetchTweets (stock) {
  const stream = twitter.stream('statuses/filter', {track: `$${stock}`});
  stream.on('data', function(tweet) {
    // console.log(tweet);
    if (tweet.text) {
      const tweetText = tweet.text;
      // console.log(tweetText);
      const sentimentScore = sentiment.analyze(tweetText).score;
      // console.log(sentimentScore);
      console.log({tweetText, sentimentScore});
      return {tweetText, sentimentScore};
    }
    // io.sockets.volatile.emit('tweet', {tweet: tweetText, sentimentScore});
  });

  stream.on('error', function(error) {
    throw error;
  });
}

// app.get('/stocks/:stock', function (req, res) {
//   const {stock} = req.params;
//   const stream = twitter.stream('statuses/filter', {track: `$${stock}`});
//   stream.on('data', function(tweet) {
//     const tweetText = tweet.text;
//     console.log(tweetText);
//     const sentimentScore = sentiment.analyze(tweetText).score;
//     console.log(sentimentScore);
//     io.sockets.volatile.emit('tweet', {tweet: tweetText, sentimentScore});
//   });

//   stream.on('error', function(error) {
//     throw error;
//   });
// });

// let server;

// function runServer(port = PORT) {
//   return new Promise((resolve, reject) => {
//     server = app.listen(port, () => {
//       console.log(`Your app is listening on port ${port}`);
//       resolve();
//     })
//       .on('error', err => {
//         reject(err);
//       });
//   });
// }

// function closeServer() {
//   return new Promise((resolve, reject) => {
//     console.log('Closing server');
//     server.close(err => {
//       if (err) {
//         return reject(err);
//       }
//       resolve();
//     });
//   });
// }

// if (require.main === module) {
//   runServer().catch(err => console.error(err));
// }

// app.use('*', function (req, res) {
//   res.status(404).sendFile(__dirname + '/public/page-not-found.html');
// });

// module.exports = {app, runServer, closeServer};