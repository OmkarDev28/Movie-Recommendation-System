// Fetching movie data from the JSON file
fetch('movies_titles_cast_director.json')
    .then(response => response.json())
    .then(data => {
        const movies = data;  // Assuming the JSON file has a structure similar to the example you've given
        
        // Adding event listener to the filter button after data is loaded
        document.getElementById('filter-button').addEventListener('click', () => filterMovies(movies));
    })
    .catch(error => {
        console.error("Error loading the movie data:", error);
    });

function filterMovies(movies) {
    const selectedGenre = document.getElementById('genre').value;
    const selectedActor = document.getElementById('actor').value.toLowerCase();
    const selectedDirector = document.getElementById('director').value.toLowerCase();
    
    const filtered = movies.filter(movie => {
        const genreMatch = selectedGenre === "" || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
        const actorMatch = selectedActor === "" || movie.cast.toLowerCase().includes(selectedActor.toLowerCase());
        const directorMatch = selectedDirector === "" || movie.director.toLowerCase().includes(selectedDirector.toLowerCase());
        
        return genreMatch && actorMatch && directorMatch;
    });

    displayFilteredMovies(filtered);
}

function displayFilteredMovies(filtered) {
    const filteredMoviesDiv = document.getElementById('filtered-movies');
    filteredMoviesDiv.innerHTML = '';

    if (filtered.length === 0) {
        filteredMoviesDiv.textContent = "No movies found.";
        return;
    }

    filtered.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.textContent = `${movie.title} (${movie.genre}) - Directed by ${movie.director}, Starring ${movie.cast}`;
        filteredMoviesDiv.appendChild(movieDiv);
    });
}
