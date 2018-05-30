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
        
  const Twitter = require('twitter');

  const client = new Twitter({
    consumer_key: 'eNdOxUmEVKf61NL2RtMozUNTB',
    consumer_secret: 'nv1VMxeEPn0Q17GpTE4uhlbw7Rc0zIWTcqDn2OOjmxftDJ02ce',
    access_token_key: '1001832367366004736-Dxb0sfz9kj4mmWNKcoN5SGAJ2Xi5sl',
    access_token_secret: 'B79ZS2Ng0GWnrpV5CevCGDmWiURIDuUI6WmeY5zx6Zw39'
  });

  const params = {screen_name: 'chris__bridges'};

const stream = client.stream('statuses/filter', {track: 'javascript'});
  stream.on('data', function(event) {
    console.log(event && event.text);
});

stream.on('error', function(error) {
  throw error;
});