# twitter 2 appdotnet

Now that you have your expensive and fancy app.net account, you need to lazily put some content on it. 

This simple node app listens to the twitter stream api for your tweets and syncs them in real time to app.net. 


##Deploy to heroku

	$ heroku create
	$ git push heroku master


##Config


Set env variables for config

	$ heroku config:add APPDOTNET_TOKEN=xxxxxxx
	$ heroku config:add TWITTER_USER_ID=1497                                                            
	$ heroku config:add TWITTER_CONSUMER_KEY=xxxxxxx                                        
	$ heroku config:add TWITTER_CONSUMER_SECRET=xxxxxxx                 
	$ heroku config:add TWITTER_TOKEN_KEY=424320037-xxxxxxx              
	$ heroku config:add TWITTER_TOKEN_SECRET=xxxxxxx                     

##Scale


	$ heroku ps:scale app=1
	
##PROFIT