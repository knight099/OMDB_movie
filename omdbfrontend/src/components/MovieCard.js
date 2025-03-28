import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        }
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="300"
          image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.Year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard; 