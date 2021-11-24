// OMDB key 107a41b7, API example shown below
//`http://www.omdbapi.com/?apikey=107a41b7&t=matrix`;
// const showMovieContent = document.querySelector("#display");
const displayArea = document.querySelector("#movie-name");
const actionButton = document.querySelector("#action-button");
console.log(actionButton);
const comedyButton = document.querySelector("#comedy-button");
console.log(actionButton);
const dramaButton = document.querySelector("#drama-button");
console.log(actionButton);
const fantasyButton = document.querySelector("#fantasy-button");
console.log(actionButton);
const horrorButton = document.querySelector("#horror-button");
console.log(actionButton);
const romanceButton = document.querySelector("#romance-button");
console.log(actionButton);
const mysteryButton = document.querySelector("#mystery-button");
console.log(actionButton);
const currentMovie = {
  title: "",
  year: "",
  rating: "",
  plot: "",
};

const modal = document.getElementById("errorModal");
const errorText = document.getElementById("error-text");
const closeSpan = document.getElementById("close-modal");

// Variables to hold wikipedia article names
const actionWiki20 = "List_of_action_films_of_the_2020s";
const comedyWiki20 = "List_of_comedy_films_of_the_2020s";
const dramaWiki10 = "List_of_drama_films_of_the_2010s";
const dramaWiki20 = "List_of_drama_films_of_the_2020s";
const fantasyWiki20 = "List_of_fantasy_films_of_the_2020s";
const horrorWiki20 = "List_of_horror_films_of_the_2020s";
const mysteryWiki20 = "List_of_mystery_films";
const romanceWiki20 = "List_of_romance_films";

let watchlist = [];
let actionMovieArray = [];
let comedyMovieArray = [];
let dramaMovieArray = [];
let fantasyMovieArray = [];
let horrorMovieArray = [];
let mysteryMovieArray = [];
let romanceMovieArray = [];

// Enter a movie name in parenthesis for an argument and get movie information
const getMovie = function (movieName) {
  let movie = movieName;

  const omdbApi = `https://www.omdbapi.com/?apikey=107a41b7&t=${movie}`;

  // Make a request to the url
  fetch(omdbApi)
    .then(function (response) {
      // If request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          currentMovie.title = data.Title;
          currentMovie.year = data.Year;
          currentMovie.rating = data.Rated;
          currentMovie.plot = data.Plot;
        });
      } else {
        displayModal("Error: " + response.statusText);
      }
    })

    .catch(function () {
      displayModal("Unable to connect");
    });
};

// Run function with Wikipedia article argument and genre argument to push movies to array
const getWikiMovies = function (wikiArticle, genreArray) {
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
              // Add it to our list
              genreArray.push(titleOnly[0]);
            }
          }
        });
      } else {
        displayModal("Error: " + response.statusText);
      }
    })
    .catch(function () {
      displayModal("Unable to connect");
    });
};

// Select movie from a MovieArray,  then select one and run getmovie
const selectMovie = function (genreArray) {
  // Checks if any movies present
  if (genreArray[0]) {
    /// Select one movie at random
    let randomNum = Math.floor(Math.random() * genreArray.length);
    getMovie(genreArray[randomNum]);
  } else {
    console.log("no movies present");
  }
};

const saveMovie = function () {
  // Check if this movie is already in watchlist
  if (watchlist.includes(`${currentMovie.title}`)) {
    displayModal(
      `${currentMovie.title} has already been added to your watchlist`
    );
  } else {
    watchlist.unshift(`${currentMovie.title}`);
    displayModal(`${currentMovie.title} added to your watchlist!`);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
};

const displayMovie = function () {
  //displayArea.textContent = currentMovie.title;
  displayArea.innerHTML = `<h1 id="title" class="">${currentMovie.title}</h1><p id="year">${currentMovie.year}</p>
  <p id="rating">${currentMovie.rating}</p><p id="plot">${currentMovie.plot}</p>
  <button class="btn button is-medium is-info" id="watchlist-button">Add to Watchlist</button>`;

  // Add event listener to our new Add to Watchlist button
  document
    .querySelector("#watchlist-button")
    .addEventListener("click", saveMovie);

  ///Unhide movie
  // showMovieContent.style.display = "block";
};

const loadWatchlist = function () {
  watchlist = JSON.parse(localStorage.getItem("watchlist"));
};

// Display modal function
displayModal = (errorMessage) => {
  modal.style.display = "block";
  errorText.textContent = errorMessage;
};

// Preload all the Wikipedia data
getWikiMovies(actionWiki20, actionMovieArray);
getWikiMovies(comedyWiki20, comedyMovieArray);
getWikiMovies(dramaWiki20, dramaMovieArray);
getWikiMovies(fantasyWiki20, fantasyMovieArray);
getWikiMovies(horrorWiki20, horrorMovieArray);
getWikiMovies(romanceWiki20, romanceMovieArray);
getWikiMovies(mysteryWiki20, mysteryMovieArray);
// Load watch list
loadWatchlist();

actionButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (actionMovieArray[0]) {
    selectMovie(actionMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(actionWiki20, actionMovieArray);
    setTimeout(selectMovie(actionMovieArray), 1000);
  }
});

comedyButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (comedyMovieArray[0]) {
    selectMovie(comedyMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(actionWiki20, comedyMovieArray);
    setTimeout(selectMovie(comedyMovieArray), 1000);
  }
});

dramaButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (dramaMovieArray[0]) {
    selectMovie(dramaMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(dramaWiki20, dramaMovieArray);
    setTimeout(selectMovie(dramaMovieArray), 1000);
  }
});

fantasyButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (fantasyMovieArray[0]) {
    selectMovie(fantasyMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(fantasyWiki20, fantasyMovieArray);
    setTimeout(selectMovie(fantasyMovieArray), 1000);
  }
});

horrorButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (horrorMovieArray[0]) {
    selectMovie(horrorMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(horrorWiki20, horrorMovieArray);
    setTimeout(selectMovie(horrorMovieArray), 1000);
  }
});

romanceButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (romanceMovieArray[0]) {
    selectMovie(romanceMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(romanceWiki20, romanceMovieArray);
    setTimeout(selectMovie(romanceMovieArray), 1000);
  }
});

mysteryButton.addEventListener("click", function () {
  // Check if getWikiMovies has already been called
  if (mysteryMovieArray[0]) {
    selectMovie(mysteryMovieArray);
    setTimeout(displayMovie, 1000);
  } else {
    getWikiMovies(mysteryWiki20, mysteryMovieArray);
    setTimeout(selectMovie(mysteryMovieArray), 1000);
  }
});

// Close error modal when user clicks X, or anywhere outside modal
// Code based on https://www.w3schools.com/howto/howto_css_modals.asp
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
closeSpan.onclick = () => {
  modal.style.display = "none";
};
