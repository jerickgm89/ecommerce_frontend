import { useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FiltersCard from '../components/FiltersCard';
import { EcommerceUI } from '../../ui';
import { useFilterProductsQuery, useGetProductsLimitQuery } from '../../store/api';

export const ProductsPage = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { data: products, isError, isLoading, error } = useFilterProductsQuery({
    name: '',
    price: '',
    priceMin: minPrice,
    priceMax: maxPrice,
    year: '',
    orderBy: '',
    orderDirection: 'ASC',
  });

  const { data: productsLimit = [] } = useGetProductsLimitQuery(1);

  // const [ page, setPage ] = useState(0);
  // let nexPage = page + 1;
  // let prevPage = page - 1;


  const applyPriceFilter = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

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

  if (isError) {
    return <Typography variant="h3">Error: {error.message}</Typography>;
  }

  if (isLoading) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  if (!products) {
    return <Typography variant="h3">Waiting for data...</Typography>;
  }

  return (
    <EcommerceUI>
          <Box mt={8} mb={8} ml={8} mr={8} sx={{backgroundColor:"#F6F9FC"}}> 
      <Typography variant='h3' gutterBottom>Products</Typography> 
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <FiltersCard 
              openCategories={openCategories} 
              handleCategoriesClick={handleCategoriesClick} 
              applyPriceFilter={applyPriceFilter} // Pasando applyPriceFilter como prop
            />
        </Grid>

       
        <Grid item xs={12} sm={6} md={8} lg={9}>
          <Grid container spacing={3}>
            {productsLimit.map(product => (
              <Grid item key={product.idProduct} xs={12} sm={12} md={4} lg={4}>
                <ProductCard
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </EcommerceUI>
  );
};
