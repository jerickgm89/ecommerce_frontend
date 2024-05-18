import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, TextField, Checkbox, FormControlLabel, FormGroup, Divider, List, ListItemButton, ListItemText, Collapse, Button, MenuItem } from '@mui/material';
import Rating from "@mui/material/Rating";
import { useGetBrandsQuery, useGetCategoriesQuery } from '../../store/api/ecommerceApi';

const FiltersCard = ({ openCategories, handleCategoriesClick, applyPriceFilter, applySorting, applyCategoryFilter, applyBrandFilter }) => {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [category, setCategory] = useState('');
  const [orderDirection, setOrderDirection] = useState('');
  const [brand, setBrand] = useState('');

  const { data: filterBrands = [] } = useGetBrandsQuery();
  const { data: filterCategories = [] } = useGetCategoriesQuery();

  // console.log(filterCategories);

  useEffect(() => {
    applySorting(orderBy, orderDirection);
  }, [orderDirection]);

  const handlepriceMinChange = (event) => {
    setPriceMin(event.target.value);
  };

  const handlepriceMaxChange = (event) => {
    setPriceMax(event.target.value);
  };

  const handleApplyFilter = () => {
    applyPriceFilter(priceMin, priceMax);
  };

  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
    applyCategoryFilter(categoryId);
  };

  const handleBrandChange = (brandId) => {
    setBrand(brandId);
    applyBrandFilter(brandId);
  };

  const handleOrderByChange = (event) => {
    const selectedOrderBy = event.target.value;
    setOrderBy(selectedOrderBy === "" ? "" : selectedOrderBy);
  };

  const handleOrderDirectionChange = (event) => {
      setOrderDirection(event.target.value);
  };

  return (
    <Paper elevation={3} style={{ maxHeight: '100%', padding: '18px 27px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }} gutterBottom>Categories</Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          select
          label="Category"
          variant="outlined"
          size="small"
          value={category}
          onChange={(event) => handleCategoryChange(event.target.value)}
          style={{ width: '100%' }}
        >
          <MenuItem value="">Seleccionar categoría</MenuItem>
          {filterCategories.map(category => (
            <MenuItem key={category.idCategory} value={category.idCategory}>
              {category.nameCategory}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Divider style={{ margin: '16px 0', borderColor: '#F3F5F9' }} />

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Sort By</Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          select
          label="Order By"
          variant="outlined"
          size="small"
          value={orderBy}
          onChange={handleOrderByChange}
          style={{ marginRight: '8px', flex: 1 }}
        >
          <MenuItem value="">Order By</MenuItem>
          <MenuItem value="nameProduct">Name</MenuItem>
          <MenuItem value="priceProduct">Price</MenuItem>
          <MenuItem value="yearProduct">Year</MenuItem>
        </TextField>

        <TextField
          select
          label="Order Direction"
          variant="outlined"
          size="small"
          value={orderDirection}
          onChange={handleOrderDirectionChange}
          style={{ flex: 1 }}
        >
          <MenuItem value="">Order Direction</MenuItem>
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </TextField>
      </Box>

      <Divider style={{ margin: '16px 0', borderColor: '#F3F5F9' }} />

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Price Range</Typography>
      
      <Box display="flex" alignItems="center" mb={2}>
        <TextField 
          label="Min Price" 
          variant="outlined" 
          size="small" 
          value={priceMin}
          onChange={handlepriceMinChange}
          style={{ marginRight: '8px', flex: 1 }}
        />
        <Typography variant="body1" style={{ margin: '0 8px' }}>to</Typography>
        <TextField 
          label="Max Price" 
          variant="outlined" 
          size="small" 
          value={priceMax}
          onChange={handlepriceMaxChange}
          style={{ flex: 1 }}
        />
      </Box>
      <Button variant="contained" onClick={handleApplyFilter}>Apply Filter</Button>

      <Divider style={{ margin: '16px 0', borderColor: '#F3F5F9' }} />

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Brands</Typography>

      <TextField
        select
        label="Brands"
        variant="outlined"
        size="small"
        value={brand}
        onChange={(event) => handleBrandChange(event.target.value)}
        style={{ width: '100%', marginBottom: '16px' }}
      >
        <MenuItem value="">Seleccionar marca</MenuItem>
        {filterBrands.map(brand => (
          <MenuItem key={brand.idBrand} value={brand.idBrand}>
            {brand.nameBrand}
          </MenuItem>
        ))}
      </TextField>

      {/* <Divider style={{ margin: '16px 0',  borderColor:'#F3F5F9'  }} />

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
      </FormGroup> */}
    </Paper>
  );
};

export default FiltersCard;