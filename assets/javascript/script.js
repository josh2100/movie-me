// OMDB key 107a41b7, API example shown below
//`http://www.omdbapi.com/?apikey=107a41b7&t=matrix`;

// Variables to hold wikipedia article names
// We need the following genres: Action Comedy Drama Fantasy Horror Mystery Romance
const actionWiki20 = "List_of_action_films_of_the_2020s";
const commedyWiki20 = "List_of_comedy_films_of_the_2020s";
const dramaWiki10 = "List_of_drama_films_of_the_2010s";
const dramaWiki20 = "List_of_drama_films_of_the_2020s";
let movieArray = [];

// Enter a movie name in parenthesis for an argument and get movie information
const getMovie = function (movieName) {
  let movie = movieName;

  const omdbApi = `http://www.omdbapi.com/?apikey=107a41b7&t=${movie}`;

  // Make a request to the url
  fetch(omdbApi)
    .then(function (response) {
      // If request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          alert(
            `${data.Title} Year: ${data.Year} Rated: ${data.Rated} Plot: ${data.Plot}`
          );
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// Run function with Wikipedia article argument to push movies to movieArray
const getWikiMovies = function (wikiArticle) {
  let article = wikiArticle;
  let wikipediaApi = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&prop=links&pllimit=500&titles=${article}&origin=*`;

  fetch(wikipediaApi)
    .then(function (response) {
      // If request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // Gets ID for pages object
          let pageId = Object.keys(data.query.pages)[0];
          // Gets all links in data object
          let movies = data.query.pages[pageId].links;

          for (let i = 0; i < movies.length; i++) {
            const element = movies[i];
            // Filter for links that are individual films
            if (
              element.title.includes(" film)") &&
              !element.title.includes("films")
            ) {
              // Get just the title text
              let titleOnly = element.title.split("(");
              console.log(titleOnly[0]);
              // Add it to our list
              movieArray.push(titleOnly[0]);
            }
          }
          // alert(movieArray);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// Select movie from movieArray,  then select one and run getmovie
const selectMovie = function () {
  // Checks if any movies present
  if (movieArray[0]) {
    console.log("some movies are present");
    let randomNum = Math.floor(Math.random() * movieArray.length);
    console.log(randomNum);
    /// Select one movie at random
    getMovie(movieArray[randomNum]);
  } else {
    console.log("no movies present");
  }
};

var actionButton = document.querySelector(".genre-btn");
console.log(actionButton);

actionButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (movieArray[0]) {
    setTimeout(selectMovie, 1000);
  } else {
    getWikiMovies(actionWiki20);
    setTimeout(selectMovie, 1000);
  }
});
