var twitter = require('ntwitter');
var AppDotNet = require('appdotnet');

config = {
  'appdotnet_token': "AQAAAAAAAVoUOk7ehUvMUr9wzJvUHuyf_aq0Alw49srv7UNw3u8Hfg-Oxmx1HGVwx3wao0gb6Axl_jiaz-MhpKnBgkU94aZsknjCPVdngVVb8KWZjQAFoGIo6P94593QnzTODY1GNE7s",
  'twitter_user_id': '813286',
  'twitter_consumer_key': 'O4S7hbxaPkovNiyU6EQ',
  'twitter_consumer_secret': 'RjthdRKq2KcCGpq3bpHqe3W8Ps2fyjaFhkkVs10OZOQ',
  'twitter_access_token_key': '813286-TfvGT9oyipkVQtG5ShsU9oy1FleSGADIDfuDyrEcyXo',
  'twitter_access_token_secret': '5HwTqyuSxP7ddvYTSy8U0cyfQu5sxRpSXx9mLz8pzUs'
}

appdotnet_client = new AppDotNet(config.appdotnet_token)

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

