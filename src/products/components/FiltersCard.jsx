import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, TextField, Checkbox, FormControlLabel, FormGroup, Divider, List, ListItemButton, ListItemText, Collapse, Button, MenuItem } from '@mui/material';
import Rating from "@mui/material/Rating";
import ExpandLess from '@mui/icons-material/ExpandLess';
import { useGetBrandsQuery, useGetCategoriesQuery } from '../../store/api/ecommerceApi';
import { ExpandMoreRounded } from '@mui/icons-material';

const FiltersCard = ({ openCategories, handleCategoriesClick, applyPriceFilter, applySorting, applyCategoryFilter, applyBrandFilter }) => {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [category, setCategory] = useState('');
  const [orderDirection, setOrderDirection] = useState('');
  const [brand, setBrand] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  const { data: filterBrands = [] } = useGetBrandsQuery();
  const { data: filterCategories = [] } = useGetCategoriesQuery();

  useEffect(() => {
    applySorting(orderBy, orderDirection);
  }, [orderDirection]);

  const handlepriceMinChange = (event) => {
    const input = event.target.value;
    // Solo permitir números y un máximo de dos decimales
    if (/^\d*\.?\d{0,2}$/.test(input)) {
      setPriceMin(input);
    }
  };

  const handlepriceMaxChange = (event) => {
    const input = event.target.value;
    // Solo permitir números y un máximo de dos decimales
    if (/^\d*\.?\d{0,2}$/.test(input)) {
      setPriceMax(input);
    }
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

  const handleOrderByChange = (orderByValue) => {
    setOrderBy(orderByValue);
    applySorting(orderByValue, orderDirection);
  };

  const handleOrderDirectionChange = (orderDirectionValue) => {
    setOrderDirection(orderDirectionValue);
    applySorting(orderBy, orderDirectionValue);
  };

  const handleClearCategory = () => {
    setCategory('');
    applyCategoryFilter('');
  };

  const handleToggleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleToggleOrder = () => {
    setOpenOrder(!openOrder);
  };

  const handleToggleBrand = () => {
    setOpenBrand(!openBrand);
  };

  const handleClearOrder = () => {
    setOrderBy('');
    setOrderDirection('');
    applySorting('', '');
  };

  const handleClearBrand = () => {
    setBrand('');
    applyBrandFilter('');
  };

  const handleClearFilter = () => {
    setPriceMin('');
    setPriceMax('');
    applyPriceFilter('', '');
  };

  return (
    <Paper elevation={3} style={{ maxHeight: '100%', padding: '18px 27px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }} gutterBottom>Categories</Typography>
      
      <ListItemButton onClick={handleToggleCategory}>
        <ListItemText primary="Category" />
        {openCategory ? <ExpandLess /> : <ExpandMoreRounded />}
      </ListItemButton>
      <Collapse in={openCategory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleClearCategory} sx={{ pl: 4 }}>
            <ListItemText primary="Select category" />
          </ListItemButton>
          {filterCategories.map(category => (
            <ListItemButton key={category.idCategory} onClick={() => handleCategoryChange(category.idCategory)} sx={{ pl: 4 }}>
              <ListItemText primary={category.nameCategory} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 0, 0, 0.2)' }} />

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Sort By</Typography>

      <ListItemButton onClick={handleToggleOrder}>
        <ListItemText primary="Order By" />
        {openOrder ? <ExpandLess /> : <ExpandMoreRounded />}
      </ListItemButton>
      <Collapse in={openOrder} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleClearOrder} sx={{ pl: 4 }}>
            <ListItemText primary="Select Order" />
          </ListItemButton>
          <ListItemButton onClick={() => handleOrderByChange("nameProduct")} sx={{ pl: 4 }}>
            <ListItemText primary="Name" />
          </ListItemButton>
          <ListItemButton onClick={() => handleOrderByChange("priceProduct")} sx={{ pl: 4 }}>
            <ListItemText primary="Price" />
          </ListItemButton>
          <ListItemButton onClick={() => handleOrderByChange("yearProduct")} sx={{ pl: 4 }}>
            <ListItemText primary="Year" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => handleOrderDirectionChange("ASC")} sx={{ pl: 4 }}>
            <ListItemText primary="Ascending" />
          </ListItemButton>
          <ListItemButton onClick={() => handleOrderDirectionChange("DESC")} sx={{ pl: 4 }}>
            <ListItemText primary="Descending" />
          </ListItemButton>
        </List>
      </Collapse>

      <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 0, 0, 0.2)' }} />

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
      <Box display="flex">
        <Button sx={{ margin: '5px' }} variant="contained" onClick={handleApplyFilter}>Apply</Button>
        <Button sx={{ margin: '5px' }} variant="contained" onClick={handleClearFilter}>Clear</Button>
      </Box>

      <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 0, 0, 0.2)' }} />

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Brands</Typography>

      <ListItemButton onClick={handleToggleBrand}>
        <ListItemText primary="Brands" />
        {openBrand ? <ExpandLess /> : <ExpandMoreRounded />}
      </ListItemButton>
      <Collapse in={openBrand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleClearBrand} sx={{ pl: 4 }}>
            <ListItemText primary="Select Brand" />
          </ListItemButton>
          {filterBrands.map(brand => (
            <ListItemButton key={brand.idBrand} onClick={() => handleBrandChange(brand.idBrand)} sx={{ pl: 4 }}>
              <ListItemText primary={brand.nameBrand} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

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