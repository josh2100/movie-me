const watchlistDisplay = document.querySelector("#watchlist-display");

// load and display
const showWatchlist = function () {
  let savedMovies = JSON.parse(localStorage.getItem("watchlist"));

  watchlistDisplay.innerHTML = `<h1">${savedMovies}</h1>`;
};

showWatchlist();
