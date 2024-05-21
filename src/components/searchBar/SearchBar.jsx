import  { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/searchBar/searchBarSlice';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


export const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            // dispatch(setSearchTerm(trimmedValue));
            navigate(`/search?name=${trimmedValue}`);
        }
  };

    useEffect(() => {
    if (inputValue === '') {
      dispatch(setSearchTerm(''));
    }
  }, [inputValue, dispatch]);


  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Buscar productos..."
        variant="outlined"
        size="small"
        // sx={{ mr: 2 }}
      />
      <Button onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </Box>
  );
};

