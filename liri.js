require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");


var cmdArg = process.argv;
var liriCommand = cmdArg[2];

var liriArg = "";
for (var i = 3; i < cmdArg.length; i++){
    liriArg += cmdArg[i] + " ";
}

if (liriCommand === "my-tweets") {
    getTweets();
} else if (liriCommand === "movie-this") {
    retreiveInfo(liriArg);
} else if (liriCommand === "do-what-it-says") {
    whatItSays();
} else if (liriCommand === "spotify-this-song") {
    findSong(liriArg);
}

function getTweets(){

    var client = new Twitter(keys.twitter);

    var params = {screen_name: "devindinapoli92", count: 20};

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
       
       if (!error){
        var twitterOutput = "-------------------------------\n" +
        "User Tweets:\n" + "-------------------------------\n";

        for (var i = 0; i < tweets.length; i++){
            twitterOutput += "Tweeted on: " + tweets[i].created_at + "\n" +
            "Tweet text: " + tweets[i].text + "\n" + 
            "-------------------------------\n"
        }
        console.log(twitterOutput);
       }
    })
};

function findSong(song){
    var spotify = new Spotify(keys.spotify);
    var search;

    if (song === ""){
        search = "The Sign Ace Of Base"
    } else {
        search = song;
    }

    spotify.search({type: "track", query: search}, function(error, data){
        if(error){
            console.log("ERROR!");
        }
        var songInfo = data.tracks.items[0];
        var spotifyOutput =   "-------------------------------\n" +
        "Song Info:\n" + 
        "-------------------------------\n" +
        "Song Name: " + songInfo.name + "\n" +
        "Artist: " + songInfo.artists[0].name + "\n" +
        "Album: " + songInfo.album.name + "\n" +
        "Preview: " + songInfo.preview_url + "\n";
        console.log(spotifyOutput);
    })
}

function retreiveInfo(movie){
    var search;
    if (movie === "") {
        search = "Mr. Nobody"
    } else {
        search = movie;
    }
    search = search.split(' ').join('+');
    var query = "http://www.omdbapi.com/?t=" + search + "&apikey=trilogy"
    
    request(query, function(error, response, body){
        if (error || (response.statusCode !== 200)){
            return console.log("Error Finding Entry!");
        }
        else {
            var data = JSON.parse(body);
            var movieOutput =  "-------------------------------\n" +
            "Movie Info:\n" +
            "Movie Title: " + data.Title + "\n" +
            "Year Released: " + data.Released + "\n" +
            "IMDB Rating: " + data.imdbRating + "\n" +
            "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n" +
            "Country Produced: " + data.Country + "\n" +
            "Language: " + data.Language + "\n" +
            "Plot: " + data.Plot + "\n" + 
            "Actors: " + data.Actors + "\n" +
            "-------------------------------\n";
            console.log(movieOutput);
        }
    })
}  

function whatItSays() {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        if (error){
            console.log("ERROR");
        }
        else{
            var commandData = data.split(",");
            var command = commandData[0].trim();
            var param = commandData[1].trim();

            switch(command){
                case "my-tweets":
                getTweets();
                break;

                case "spotify-this-song":
                findSong(param);
                break;

                case "movie-this":
                retreiveInfo(param);
                break;
            }
        }
    }
)};