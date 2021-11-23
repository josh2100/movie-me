const watchlistDisplay = document.querySelector("#watchlist-display");
let savedMovies = "";

// Load and display watchlist
const showWatchlist = function () {
  // Clear old content
  watchlistDisplay.innerHTML = "";
  savedMovies = JSON.parse(localStorage.getItem("watchlist"));

  savedMovies.forEach((element) => {
    // Make an h2 Element
    let newMovieEl = document.createElement("h2");
    newMovieEl.classList += "level";

    // Add text
    let movieText = document.createTextNode(`${element}`);

    // Make button element
    let newButtonEl = document.createElement("button");
    newButtonEl.textContent = "Remove";
    newButtonEl.classList = "button is-info";

    // Add it to Watchlist display
    watchlistDisplay.appendChild(newMovieEl);
    newMovieEl.appendChild(movieText);
    newMovieEl.appendChild(newButtonEl);

    newButtonEl.addEventListener("click", function (event) {
      // Get text of <h2>
      let movieToDelete = this.parentElement.textContent.split("Remove");
      let movieToDeleteString = movieToDelete[0];
      // Find index
      const movieIndex = savedMovies.indexOf(movieToDeleteString);
      // Delete that element from array
      savedMovies.splice(movieIndex, 1);
      // Update local storage
      localStorage.setItem("watchlist", JSON.stringify(savedMovies));
      // Reload with new array
      showWatchlist();
    });
  });
};

showWatchlist();
