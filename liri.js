// NOTES //
// API KEYS
// AXIOS
// VARIABLES FOR COMMAND LINE ARGUEMENTS
// 
// A SWITCH STATEMENT TO CHANGE BETWEEN INPUT TYPES
// FUNCTIONS TO RUN EACH API REQUEST

// npm install dotenv
// npm install --save node-spotify-api
// npm install axios



//require all the things
require("dotenv").config();

var fs = require('fs');

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require("moment");

var axios = require("axios");



