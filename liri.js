require("dotenv").config();
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var twitterKey = keys.twitterKey;

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

    var client = new Twitter(twitterKey);

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
}



