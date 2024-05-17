import React, { useState } from 'react';
import { Typography, Paper, Box, TextField, Checkbox, FormControlLabel, FormGroup, Divider, List, ListItemButton, ListItemText, Collapse, Button } from '@mui/material';
import Rating from "@mui/material/Rating";
import { useGetBrandsQuery, useGetCategoriesQuery } from '../../store/api/ecommerceApi';

const FiltersCard = ({ openCategories, handleCategoriesClick, applyPriceFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { data: filterBrands = [] } = useGetBrandsQuery();
  const { data: filterCategories = [] } = useGetCategoriesQuery();

  console.log(filterCategories);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleApplyFilter = () => {
    applyPriceFilter(minPrice, maxPrice);
  };

  return (
    <Paper elevation={3} style={{ maxHeight: '100%', padding: '18px 27px', borderRadius:'8px'}}>

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }} gutterBottom>Categories</Typography>
      
      <List>        
        
        {
          filterCategories.map(category => (
            <ListItemButton onClick={() => handleCategoriesClick(category.idCategory)} sx={{ fontSize: '14px', color:'inherit' }}>
              <ListItemText primary={category.nameCategory} />
            </ListItemButton>
          ))
        }


      </List>


        <Divider style={{ margin: '16px 0', borderColor:'#F3F5F9'  }} />

        <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Price Range</Typography>
        
        <Box display="flex" alignItems="center">
          <TextField 
            label="Min Price" 
            variant="outlined" 
            size="small" 
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <Typography variant="body1" gutterBottom style={{ margin: '0 8px' }}>to</Typography>
          <TextField 
            label="Max Price" 
            variant="outlined" 
            size="small" 
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </Box>
        <Button variant="contained" onClick={handleApplyFilter}>Apply Filter</Button>

        <Divider style={{ margin: '16px 0', borderColor:'#F3F5F9' }} />

        <Typography style={{ fontSize: '14px', fontWeight:'500', marginBottom: '16px', color: '#2B3445' }}>Brands</Typography>
       
        <FormGroup >
            {
                filterBrands.map(brand => (
                    <FormControlLabel control={<Checkbox />} label={<Typography style={{ fontSize: '14px', color:'inherit' }}>{brand.nameBrand}</Typography>} />
                ))
            }
        </FormGroup>

        <Divider style={{ margin: '16px 0',  borderColor:'#F3F5F9'  }} />

        <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Ratings</Typography>
        
        <FormGroup>
            {[5, 4, 3, 2, 1].map((rating) => (
            <FormControlLabel
                key={rating}
                control={<Checkbox />}
                label={<Rating name="read-only" value={rating} readOnly />}
            />
            ))}
        </FormGroup>

        <Divider style={{ margin: '16px 0', borderColor:'#F3F5F9'  }} />

        <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Colors</Typography>
        
        <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel
            control={<Checkbox icon={<div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#1C1C1C' }} />} />}
            />
            <FormControlLabel
            control={<Checkbox icon={<div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FF7A7A' }} />} />}
            />
            <FormControlLabel
            control={<Checkbox icon={<div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFC672' }} />} />}
            />
            <FormControlLabel
            control={<Checkbox icon={<div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#84FFB5' }} />} />}
            />
            <FormControlLabel
            control={<Checkbox icon={<div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#70F6FF' }} />} />}
            />
            <FormControlLabel
            control={<Checkbox icon={<div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#6B7AFF' }} />} />}
            />
        </FormGroup>
        </Paper>
  );
};

export default FiltersCard;