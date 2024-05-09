import { useState } from 'react';
import { products } from "../data";
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FiltersCard from '../components/FiltersCard';

export const ProductsPage = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [cart, setCart] = useState(products.map(product => ({ ...product, quantity: 0 })));
  const [selectedProductId, setSelectedProductId] = useState(null); 

  

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const handleAddToCart = (productId) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  

  return (
    <Box mt={4} mb={4} ml={4} mr={4}> 
      <Typography variant='h3' gutterBottom>Products</Typography> 
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FiltersCard openCategories={openCategories} handleCategoriesClick={handleCategoriesClick} />
        </Grid>

       
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Grid container spacing={3}>
            {cart.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
