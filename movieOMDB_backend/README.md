# Movie Search App Backend

A Flask backend for a movie search application using the OMDb API.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Get an OMDb API key:
   - Visit http://www.omdbapi.com/apikey.aspx
   - Sign up for a free API key
   - Copy the `.env.example` file to `.env`
   - Add your API key to the `.env` file

4. Run the application:
```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

### Search Movies
- **URL**: `/api/search`
- **Method**: `GET`
- **Query Parameters**:
  - `query`: Movie title to search for
- **Example**: `http://localhost:5000/api/search?query=inception`

### Get Movie Details
- **URL**: `/api/movie/<imdb_id>`
- **Method**: `GET`
- **Example**: `http://localhost:5000/api/movie/tt1375666`

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (missing query)
- 404: Not Found (no results or movie not found)
- 500: Server Error (API request failed) 