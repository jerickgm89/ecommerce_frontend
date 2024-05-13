import { useState } from 'react';
import { Typography, Select, Paper, MenuItem, Box, TextField, Checkbox, FormControlLabel, FormGroup, Divider, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Rating from "@mui/material/Rating";
import { useGetBrandsQuery } from '../../store/api';
import { useGetCategoriesQuery } from '../../store/api';

const FiltersCard = ({ selectedCategory, setSelectedCategory }) => {
  
  const { data: brands } = useGetBrandsQuery({orderBy: 'nameBrand', orderDirection: 'ASC'});
  const { data: categories } = useGetCategoriesQuery();


  console.log(brands, "Estas son las marcas")

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  const [selectedBrands, setSelectedBrands] = useState([]);


  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedBrands((prevSelectedBrands) => {
      if (isChecked) {
        return [...prevSelectedBrands, brandId];
      } else {
        return prevSelectedBrands.filter((id) => id !== brandId);
      }
    });
  };


  // const [openCategories, setOpenCategories] = useState(false);
  
  // const handleCategoriesClick = () => {
  //   setOpenCategories(!openCategories);
  // };

  return (
    <Paper elevation={3} style={{ maxHeight: '100%', padding: '18px 27px', borderRadius:'8px'}}>

      <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }} gutterBottom>Categories</Typography>
      
      <Select value={selectedCategory || ''} onChange={handleCategoryChange} fullWidth>
        <MenuItem value="">All Categories</MenuItem>
        {categories && categories.map(category => (
          <MenuItem key={category.idCategory} value={category.idCategory}>{category.nameCategory}</MenuItem>
        ))}
      </Select>
      {/* <List>
        <ListItemButton onClick={handleCategoriesClick}>
          <ListItemText primary="Apple" />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openCategories} timeout="auto" unmountOnExit>

          <List component="div" disablePadding>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="iOS" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="macOS" />
            </ListItemButton>
          </List>

        </Collapse>

        <ListItemButton sx={{ fontSize: '14px', color:'inherit' }}>
          <ListItemText primary="Android" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="SmartPhone" style={{ fontSize: '14px', color:'inherit' }} />
        </ListItemButton>

        </List>

        <ListItemButton>
                <ListItemText primary="Windows" />
        </ListItemButton> */}

        <Divider style={{ margin: '16px 0', borderColor:'#F3F5F9'  }} />

        <Typography style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px', color: '#2B3445' }}>Price Range</Typography>
        
        <Box display="flex" alignItems="center">
            <TextField label="Min Price" variant="outlined" size="small" />
            <Typography variant="body1" gutterBottom style={{ margin: '0 8px' }}>to</Typography>
            <TextField label="Max Price" variant="outlined" size="small" />
        </Box>

        <Divider style={{ margin: '16px 0', borderColor:'#F3F5F9' }} />

        <Typography style={{ fontSize: '14px', fontWeight:'500', marginBottom: '16px', color: '#2B3445' }}>Brands</Typography>
       
        <FormGroup>
        {brands &&
          brands.rows.map((brand) => (
            <FormControlLabel
              key={brand.idBrand}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand.idBrand)}
                  onChange={handleBrandChange}
                  value={brand.idBrand}
                />
              }
              label={<Typography style={{ fontSize: '14px', color: 'inherit' }}>{brand.nameBrand}</Typography>}
            />
          ))}
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
