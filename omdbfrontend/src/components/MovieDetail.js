import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://omdb-movie-backend.onrender.com/api/movie/${id}`
        );
        console.log(response.data)
        setMovie(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Search
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Search
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.Title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {movie.Title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {movie.Year} • {movie.Rated} • {movie.Runtime}
            </Typography>
            
            <Box sx={{ my: 2 }}>
              {movie.Genre.split(', ').map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Plot
            </Typography>
            <Typography paragraph>
              {movie.Plot}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Director
                </Typography>
                <Typography>{movie.Director}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Writers
                </Typography>
                <Typography>{movie.Writer}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Cast
                </Typography>
                <Typography>{movie.Actors}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Awards
                </Typography>
                <Typography>{movie.Awards}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MovieDetail; 