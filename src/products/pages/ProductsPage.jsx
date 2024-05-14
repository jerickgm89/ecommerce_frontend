import { useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FiltersCard from '../components/FiltersCard';
import { EcommerceUI } from '../../ui';
import { useGetProductsQuery } from '../../store/api';


export const ProductsPage = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [cart, setCart] = useState();
  let { data: products = [], error, isLoading } = useGetProductsQuery();
  
  console.log(products);
  

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const handleAddToCart = (productId) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleRemoveFromCart = (productIdProducts) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };  

  return (
    <EcommerceUI>
      <Box mt={8} mb={8} ml={8} mr={8} sx={{backgroundColor:"#F6F9FC"}}> 
          <Typography variant='h3' gutterBottom>Products</Typography> 
          <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FiltersCard 
                openCategories={openCategories} 
                handleCategoriesClick={handleCategoriesClick} 
              />
            </Grid>

          
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Grid container spacing={3}>
                {products.map(product => (
                <Grid item key={product.idProduct} xs={12} sm={12} md={4} lg={4}>
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                </Grid>))} 
              </Grid>
            </Grid>
          </Grid>
      </Box>
    </EcommerceUI>
  )
};
