let moviesData = [];

// Fetch movies data
async function fetchMovies() {
    try {
        const response = await fetch('movies.json'); // Adjust the path as necessary
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        moviesData = await response.json(); // Parse JSON
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Display similar movies
function displayRecommendations(similarMovies) {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = ''; // Clear previous results
    let count = 0; // Initialize count for displayed movies
    const limit = 10; // Number of movies to show initially

    // Function to show more movies
    function showMore() {
        const slice = similarMovies.slice(count, count + limit); // Slice the array to show a portion
        slice.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.textContent = movie; // Add movie title to results
            movieItem.classList.add('recommendation-item'); // Add a class for styling
            recommendationsContainer.appendChild(movieItem); // Append to results container
        });
        count += limit; // Update count for next show

        // Check if there are more movies to show
        if (count < similarMovies.length) {
            // Create or update the Show More button
            let moreButton = document.getElementById('show-more-button');
            if (!moreButton) {
                moreButton = document.createElement('button');
                moreButton.id = 'show-more-button'; // Set an ID for the button
                moreButton.textContent = 'Show More';
                recommendationsContainer.appendChild(moreButton); // Append button
            }
            moreButton.onclick = showMore; // Bind click to show more movies
        } else {
            // If no more movies, remove the button if it exists
            const moreButton = document.getElementById('show-more-button');
            if (moreButton) {
                moreButton.remove(); // Remove the button when no more movies
            }
        }
    }

    showMore(); // Initial call to show movies
}

// Handle movie input
function handleMovieInput(event) {
    const input = event.target.value.toLowerCase(); // Get the current input value
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (input) {
        const filteredMovies = moviesData.filter(movie => 
            movie.title.toLowerCase().includes(input)
        ); // Filter movies based on input

        filteredMovies.forEach(movie => {
            const item = document.createElement('div');
            item.textContent = movie.title; // Set movie title
            item.classList.add('suggestion-item');
            item.onclick = () => selectMovie(movie.title); // Bind click event to select movie
            suggestions.appendChild(item); // Append suggestion item
        });

        if (filteredMovies.length > 0) {
            suggestions.style.display = 'block'; // Show suggestions if any
        } else {
            suggestions.style.display = 'none'; // Hide if no suggestions
        }
    } else {
        suggestions.style.display = 'none'; // Hide if input is empty
    }
}

// Select movie from suggestions
function selectMovie(movieTitle) {
    const input = document.getElementById('movie-input');
    input.value = movieTitle; // Set input value to selected movie title
    document.getElementById('suggestions').style.display = 'none'; // Hide suggestions
    handleMovieSelection(); // Trigger similar movie display
}

// Handle movie selection
async function handleMovieSelection() {
    const selectedMovie = document.getElementById('movie-input').value.trim();
    
    const movie = moviesData.find(movie => movie.title === selectedMovie); // Find the selected movie
    if (movie) {
        displayRecommendations(movie.similar_movies); // Display similar movies
    } else {
        alert("Movie not found! Please select a valid movie name.");
    }
}

// Initialize the application
window.onload = fetchMovies; // Fetch movies data on page load
document.getElementById('movie-input').addEventListener('input', handleMovieInput); // Bind input event
