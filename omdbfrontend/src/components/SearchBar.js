import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        mb: 4
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default SearchBar; 