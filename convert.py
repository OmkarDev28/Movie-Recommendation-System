import pickle
import json

# Load your movies and similarity data from pickle files
with open('movies.pkl', 'rb') as f:
    movies_data = pickle.load(f)

with open('similarity.pkl', 'rb') as f:
    similarity = pickle.load(f)

# Create a list of movie titles
movie_titles = movies_data['title'].values

# Create a list to store each movie and its similar movies
movie_recommendations = []

# For each movie, find its 10 most similar movies based on the similarity matrix
for idx, title in enumerate(movie_titles):
    # Get indices of the 10 most similar movies, excluding the first one (itself)
    similar_indices = similarity[idx].argsort()[-100:-1][::-1]  # Get the last 11 indices and reverse to get most similar first
    similar_movies = [movie_titles[i] for i in similar_indices]  # Extract movie titles

    movie_recommendations.append({
        'title': title,
        'similar_movies': similar_movies
    })

# Save the recommendations as a JSON file
with open('movies.json', 'w') as json_file:
    json.dump(movie_recommendations, json_file, indent=4)  # Use indent for pretty printing
