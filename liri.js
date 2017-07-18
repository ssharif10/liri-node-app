// Here we require our keys from keys.js
var keys = require("./keys.js");


// store requirements in a variable
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
//this requireirement variable is for omdb
var request = require("request");

var twitterKeyListing = keys.twitterKeys;
var spotifyKeyListing = keys.spotifyKeys;
var omdbKeyListing = keys.omdbKeys;

// setting user input to a variable;(action)
var userInput = process.argv[2];

// setting specific user search parameters to a variable for Twitter and Spotify; (value)
var searchCriterion = process.argv[3];

// declare varialble to store search results that will be logged in to the log.txt fule using the fs node package.
var results = [];

//switch method to allow app be able to accept specified user commands (cases)

switch (userInput) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifyThisSong();
	break;

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	spotifyThisSong();
	break;
}

// Then use the Twitter npm package-provided code to query API. Twitter key value already stored in global variable 

function myTweets() {
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
 
var params = {screen_name: 'FSTechFriend'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else console.log(error);
});
};


//////////////Spotify Section/////////////////////
