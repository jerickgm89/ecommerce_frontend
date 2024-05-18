import { useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FiltersCard from '../components/FiltersCard';
import { EcommerceUI } from '../../ui';
import { useFilterProductsQuery, useGetProductsLimitQuery } from '../../store/api';

export const ProductsPage = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  const { data: products, isError, isLoading, error } = useFilterProductsQuery({
    name: '',
    price: '',
    priceMin: priceMin,
    priceMax: priceMax,
    year: '',
    orderBy: orderBy,
    orderDirection: orderDirection,
    category: category,
    brand: brand
  });

  const { data: productsLimit = [] } = useGetProductsLimitQuery(1);

  console.log(products);

  // const [ page, setPage ] = useState(0);
  // let nexPage = page + 1;
  // let prevPage = page - 1;


  const applyPriceFilter = (priceMin, priceMax) => {
    setPriceMin(priceMin);
    setPriceMax(priceMax);
  };

  const applySorting = (orderBy, orderDirection) => {
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const applyCategoryFilter = (category) => {
    setCategory(category);
  };

  const applyBrandFilter = (brand) => {
    setBrand(brand);
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
      <Box m={8} sx={{ backgroundColor: "#F6F9FC" }}>
        <Typography variant='h3' gutterBottom>Products</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FiltersCard 
              openCategories={openCategories} 
              handleCategoriesClick={handleCategoriesClick} 
              applyPriceFilter={applyPriceFilter}
              applySorting={applySorting}
              applyCategoryFilter={applyCategoryFilter}
              applyBrandFilter={applyBrandFilter}
            />
          </Grid>
        
          <Grid item xs={12} sm={6} md={8} lg={9}>
            <Grid container spacing={3} justifyContent="center">
              {products.rows.map(product => (
                <Grid item key={product.idProduct} xs={12} sm={12} md={4.5} lg={3.5}>
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    priceMin={priceMin}
                    priceMax={priceMax}
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