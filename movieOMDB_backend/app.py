from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))

# Get OMDb API key from environment variable
OMDB_API_KEY = os.getenv('OMDB_API_KEY')
OMDB_BASE_URL = 'http://www.omdbapi.com/'

@app.route('/api/search', methods=['GET'])
def search_movies():
    query = request.args.get('query', '')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400
    
    params = {
        'apikey': OMDB_API_KEY,
        's': query,
        'type': 'movie'
    }
    
    try:
        response = requests.get(OMDB_BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data.get('Response') == 'False':
            return jsonify({'error': data.get('Error', 'No results found')}), 404
            
        return jsonify(data)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/movie/<imdb_id>', methods=['GET'])
def get_movie_details(imdb_id):
    params = {
        'apikey': OMDB_API_KEY,
        'i': imdb_id,
        'plot': 'full'
    }
    
    try:
        response = requests.get(OMDB_BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data.get('Response') == 'False':
            return jsonify({'error': data.get('Error', 'Movie not found')}), 404
            
        return jsonify(data)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if not OMDB_API_KEY:
        print("Warning: OMDB_API_KEY not found in environment variables")
    app.run(debug=True, host="0.0.0.0", port=port) 