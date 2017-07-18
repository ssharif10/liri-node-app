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
var client = new Twitter(twitterKeyListing);
 
var params = {screen_name: 'FSTechFriend'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  } else console.log(error);

  for(var i = 0; i < tweets.length; 1++) {
  	console.log(
  		results[i] = 
  		"This tweet was created at: " + tweets[i].created_at + 
  		"The text of this tweet is: " + tweets[i].text);
  }

});


/////////Spotify Section///////

function spotifyThisSong () {
	if (searchCriterion == null) {
		searchCriterion = "The Sign, Ace of Base";
	}
var spotify = new Spotify(spotifyKeyListing);
 
spotify.search({ type: 'track', query: searchCriterion }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

////////////OMDB Section//////

funtion movieThis () {
	if (searchCriterion == null) {
		searchCriterion = "Mr. Nobody";
	}

	request("http://www.omdbapi.com/?t=" + searchCriterion + "&y=&plot=short&apikey=40e9cece" , function (error, response, body) {

  // If the request is successful 
  if (!error && response.statusCode === 200) {

    // Parse the body of object
    console.log("The movie's title is: " + JSON.parse(body).imdbTitle;)
    console.log("The movie's release year is: " + JSON.parse(body).Year);
    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
    console.log("The movie's Rotten tomato rating is: " + JSON.parse(body).tomatoRating);
    console.log("The movie's country is: " + JSON.parse(body).Country);
    console.log("The movie's language is: " + JSON.parse(body).Language);
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    console.log("The movie's actors are: " + JSON.parse(body).Actors);

  }
});
  console.log('error:', error); 





/////////Do what it says section/////////
function doWhatItSays () {

fs.readFile("random.txt", "utf8", function(err, data) {

  //log any errors
  if (err) {
    return console.log(err);
  }

  console.log(data);

  var infoArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(infoArr);

  }

});







