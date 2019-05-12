// require all the things
require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

// action variables
var action = process.argv[2];
var nodeArgs = process.argv;
var input = "";

// loop for inputs
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        input = input + '+' +nodeArgs[i];
    } else {
        input += nodeArgs[i];
    }
}

// switch case for actions
switch (action) {
    case "movie":
    movie();
    break;

    case "concert":
    concert();
    break;

    case "spotify":
    spotifyThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
    break;

    default:
    console.log("After 'node liri.js' use one of these commands: ");
    console.log("movie");
    console.log("concert");
    console.log("spotify");
    console.log("do-what-it-says");
    break;
}

// OMDB API
function movie() {
    if (input === "") input = "American Psycho"

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function(response) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("Movie Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country of Origin: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    })
}

// BANDSINTOWN API
function concert() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp+limit=3";

    axios.get(queryUrl).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            console.log("Date: " + moment(response.data[i].datetime).toDate());
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

// SPOTIFY API
function spotifyThis() {
    if (input === "") input = "idioteque radiohead"

    spotify
    .search({
        type: "track",
        query: input,
        limit: 3
    }).then(function(response) {
        for (var j = 0; j < response.tracks.items.length; j++) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("Artist: ", response.tracks.items[j].artists[0].name);
            console.log("Album: ", response.tracks.items[j].album.name);
            console.log("Song: ", response.tracks.items[j].name);
            console.log("Preview: ", response.tracks.items[j].external_urls.spotify);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}
// DO WHAT IT SAYS
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
      input = data;
      spotifyThis(data);
    })
  }