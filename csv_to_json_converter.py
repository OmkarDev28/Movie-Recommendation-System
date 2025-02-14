import csv
import json

# Open the movies.csv file
with open('movies.csv', 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    movies_data = []

    # Loop through each row and append only the selected fields to the list
    for row in csv_reader:
        movie = {
            "title": row["title"],        # Assuming the column name is "title"
            "cast": row["cast"],          # Assuming the column name is "cast"
            "director": row["director"],   # Assuming the column name is "director"
            "genre" : row["genres"]
        }
        movies_data.append(movie)

# Write the filtered data to a new JSON file
with open('movies_titles_cast_director.json', 'w', encoding='utf-8') as json_file:
    json.dump(movies_data, json_file, indent=4)

print("CSV to JSON conversion completed!")
