var twitter = require('ntwitter');
var AppDotNet = require('appdotnet');

var config = require('./config')

appdotnet_client = new AppDotNet(config.token)

var twit = new twitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token_key,
  access_token_secret: config.twitter_access_token_secret
});

twit.stream('statuses/filter', {'follow':config.twitter_user_id}, function(stream) {
  stream.on('data', function (data) {
    params = {
        'text':data['text'],
        'id':data['id']

    }
    console.log('Received tweet id: '+params['id'])
    appdotnet_client.createPost(params, function (err, post) {
        console.log('Posted tweet id: '+params['id']+' to app.net')
    });  
  });
});

