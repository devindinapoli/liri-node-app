# liri-node-app

- In this project, I have  created LIRI. LIRI is designed like Apple's SIRI. However, instead of being a Speech Interpretation and Recognition Interface (SIRI), LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

- Since LIRI will display the user's latest tweets, I have made an alias account so personal data isn't displayed.

- The data being retrieved comes from Twitter, Spotify API, and OMDB API. The following npm packages are used in this application:

* [Twitter](https://www.npmjs.com/package/twitter)

* [Spotify](https://www.npmjs.com/package/node-spotify-api)

* [Request](https://www.npmjs.com/package/request)

* Request is used to grab data from the [OMDB API](http://www.omdbapi.com).

* [DotEnv](https://www.npmjs.com/package/dotenv)


## LIRI takes in the following commands:
* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

### What Each Command Should Do

1. `node liri.js my-tweets`

* This will show the last 20 tweets and when they were created at in the terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

* This will show the following information about the song in the terminal/bash window:

* Artist(s)

* The song's name

* A preview link of the song from Spotify

* The album that the song is from

* If no song is provided then the program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

* This will output the following information to the terminal/bash window:

```
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
```

* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* By default, it should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

