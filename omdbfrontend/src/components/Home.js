import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://omdb-movie-backend.onrender.com/api/search?query=${encodeURIComponent(
          searchTerm
        )}`
      );
      console.log(response.data)
      setMovies(response.data.Search || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Movie Search
      </Typography>
      
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : movies.length > 0 ? (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Container>
  );
};

export default Home; 