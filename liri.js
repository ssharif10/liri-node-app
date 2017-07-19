// Here we require our keys from keys.js
var keys = require("./keys.js");
var fs = require("fs");

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
	doWhatItSays();
	break;
}

// Then use the Twitter npm package-provided code to query API. Twitter key value already stored in global variable 

function myTweets() {
var client = new Twitter(twitterKeyListing);
 
var params = {screen_name: 'FSTechFriend'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
  } else console.log(error);

  ///created for loop to go through each tweet and pull out specified information

  for(var i = 0; i < tweets.length; i++) {
  	console.log(
  		results[i] = 
  		"This tweet was created at: " + tweets[i].created_at + "\r\n"+
  		"The text of this tweet is: " + tweets[i].text);   
  } 
  appendToLog();
});

}
// /////////Spotify Section///////

function spotifyThisSong () {
	if (searchCriterion == null) {
		searchCriterion = "The Sign, Ace of Base";
	}
var spotify = new Spotify(spotifyKeyListing);
 
spotify.search({ type: 'track', query: searchCriterion }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } else {

var songData = data.tracks.items[0]; 
results = 
  "Artist: " + songData.artists[0].name + "\r\n" + 
  "Song Name: " + songData.name + "\r\n" +
  "Preview Link: " + songData.preview_url + "\r\n" + 
  "Album Name: " + songData.album.name; 
  console.log(results);
  appendToLog();
}

});
}

// ////////////OMDB Section//////

function movieThis () {
	if (searchCriterion == null) {
		searchCriterion = "Mr. Nobody";
	}

	request("http://www.omdbapi.com/?t=" + searchCriterion + "&y=&plot=short&apikey=40e9cece&tomatoes=true&r=json" , function (error, response, body) {

  // If the request is successful 
  if (!error && response.statusCode === 200) {

      var movieData = JSON.parse(body);
      //console.log(movieData);

    // Parse the body of object
   results = 
    "The movie's title is: " + movieData.Title + "\r\n" + 
    "The movie's release year is: " + movieData.Year + "\r\n" + 
    "The movie's IMDB rating is: " + movieData.imdbRating + "\r\n" + 
    "The movie's Rotten tomato rating is: " + movieData.tomatoRating + "\r\n" + 
    "The movie's country is: " + movieData.Country + "\r\n" + 
    "The movie's language is: " + movieData.Language + "\r\n" + 
    "The movie's plot is: " + movieData.Plot + "\r\n" + 
    "The movie's actors are: " + movieData.Actors + "\r\n";
     console.log(results);
     appendToLog();
  
  } else {
  console.log('error:', error); 
  }

});
  
}




// /////////Do what it says section/////////
function doWhatItSays () {

fs.readFile("random.txt", "utf8", function(err, data) {

  //log any errors
  if (err) {
    return console.log(err);
  
  } else {

  //splits text from random.txt into an array
  var infoArr = data.split(",");

  //we want infoArr at index 1 which is the song title to spotify
  searchCriterion = infoArr[1];
  spotifyThisSong();
  appendToLog();

    }
  });
}

///////////Bonus//////////////
function appendToLog () {

fs.appendFile("log.txt", results + "\r\n", function(err, data) {

  //log any errors
  if (err) {
    return console.log(err);
  
  } 
  });
}

