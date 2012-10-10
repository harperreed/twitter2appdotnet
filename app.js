var twitter = require('ntwitter');
var AppDotNet = require('appdotnet');

config = {
  'appdotnet_token': process.env.APPDOTNET_TOKEN,
  'twitter_user_id': process.env.TWITTER_USER_ID,
  'twitter_consumer_key': process.env.TWITTER_CONSUMER_KEY,
  'twitter_consumer_secret': process.env.TWITTER_CONSUMER_SECRET,
  'twitter_access_token_key': process.env.TWITTER_TOKEN_KEY,
  'twitter_access_token_secret': process.env.TWITTER_TOKEN_SECRET
}


if (typeof config.appdotnet_token== "undefined"){
  console.log('No appdotnet token.');
  process.exit(1);
}

if (typeof config.twitter_user_id== "undefined"){
  console.log('No twitter user_id.');
  process.exit(1);
}

if (typeof config.twitter_consumer_key== "undefined"){
  console.log('No twitter_consumer_key.');
  process.exit(1);
}

if (typeof config.twitter_consumer_secret== "undefined"){
  console.log('No twitter_consumer_secret.');
  process.exit(1);
}

if (typeof config.twitter_access_token_key== "undefined"){
  console.log('No twitter_access_token_key.');
  process.exit(1);
}

if (typeof config.twitter_access_token_secret== "undefined"){
  console.log('No twitter_access_token_secret.');
  process.exit(1);
}

appdotnet_client = new AppDotNet(config.appdotnet_token)

console.log('Instantiating twitter class');
var twit = new twitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token_key,
  access_token_secret: config.twitter_access_token_secret
});

console.log('Instantiating twitter stream for user id: '+config.twitter_user_id);
twit.stream('statuses/filter', {'follow':config.twitter_user_id}, function(stream) {
  stream.on('data', function (data) {
    params = {
        'text':data['text'],
        'id':data['id'],
        'user_id':data['user']['id']
    }
    if (params['user_id'] == config.twitter_user_id){
        console.log('Received tweet id: '+params['id'])
        appdotnet_client.createPost(params, function (err, post) {
            console.log('Posted tweet id: '+params['id']+' to app.net')
            if (err){
              console.log('ERROR');
              console.log(err);
              console.log(params);
            }
        });   
    }

  });
});

