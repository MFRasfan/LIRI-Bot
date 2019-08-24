require("dotenv").config();

// Import keys.js file
var keys = require("./keys.js");

//fs
var fs = require("fs");

// Calls to Concert and OMDB
var axios = require('axios');

// Date Formatting
var moment = require('moment');

// Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var track = process.argv[3];
//input
var liriReturn = process.argv[2]
var artist = process.argv[3]
var movie = process.argv[3]

switch (liriReturn) {
    case "concert-this":
        concertThis();
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

function concertThis() {
    // Default value
    if (artist == "") {
        artist = "The Beatles"
    }

    var CURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(CURL).then(function (response) {
        
   
            var concertData = response.data[0];

            var cResults = [
                "Venue name: " + concertData.venue.name ,
                "City: " + concertData.venue.city ,
                "Date: " + moment(concertData.datetime).format('MM/DD/YYYY')
            ].join("\n\n");

            console.log(cResults);

        


    });
}
    
//SPOTIFY FUNCTION
function spotifyThisSong() {
    //store user input 

    //user input == null, take default selection
    if (track == "") {
        track = "OldTown"
    }
    //search spotify based on track
    songRequest = track;
    spotify.search({
        type: "track",
        query: songRequest,
    },
    function (err, data) {
            if (err) {
                console.log(err);
            } else {
            var trackInfo = data.tracks.items;
            for (var i = 0; i < 1; i++) {
            if (trackInfo[i] != undefined) {
                var sResults = [
                "Artist: " + trackInfo[i].artists[0].name,
                "Song: " + trackInfo[i].name,
                "Preview Link: " + trackInfo[i].preview_url,
                "Album: " + trackInfo[i].album.name,
                ].join("\n\n");


                 console.log(sResults)
            };
         };
        }
    })
}


//MOVIE FUNCTION
function movieThis() {


    if (movie == "") {
        movie = "mr nobody";

        console.log("If you haven't watched mr nobody then you should: http://www.imdb.com/title/tt0485947/")

        console.log("It's on Netflix!")

    }
    //url 
    var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then(function (response) {

        // if (err) {
        //     //console.log(err);
        // }

       
            var movieData = response.data;

            //grabbing data
            var mResults = [
                "Title: " + movieData.Title,
                "Year: " + movieData.Year,
                "IMDB Rating: " + movieData.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value,
                "Country: " + movieData.Country,
                "Language: " + movieData.Language,
                "Plot: " + movieData.Plot,
                "Actors: " + movieData.Actors,
            ].join("\n\n");


            // console.log(mResults);
        console.log(mResults);


      


    });


}
function doWhatItSays() {
    //grabbing information on random.txt file
    fs.readFile("random.txt", "utf8", function (err, data) {

        //split it into two, option and parameter
        var dataArray = data.split(",");
        var option = (dataArray[0]);
        var parameter = (dataArray[1]);
        // console.log(option, parameter)

        //if error, display
        if (err) {
            console.log(err);

              //if spotify-this-song, display and take as input for function
        }  else if (option == "spotify-this-song") {
            track = parameter;
            spotifyThisSong()

        }
    });
}

