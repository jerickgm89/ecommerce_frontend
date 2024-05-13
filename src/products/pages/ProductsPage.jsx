
import { useState, useEffect} from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import FiltersCard from '../components/FiltersCard';
import { UIEcommerce } from '../../ui';
import { useGetProductsQuery } from '../../store/api';
// import { useDispatch, useSelector} from 'react-redux';
// import { setProducts, filterProducts } from '../../store/products/productSlice';

export const ProductsPage = () => {
  const { data: products, isError, isLoading, error } = useGetProductsQuery({ orderBy: 'nameProduct', orderDirection: 'ASC' });


  const [cart, setCart] = useState([]);
  
  const handleAddToCart = (productId) => {
    const productIndex = cart.findIndex(item => item.idProduct === productId);
    if (productIndex !== -1) {
      setCart(prevCart => {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      });
    } else {
      const productToAdd = products.rows.find(product => product.idProduct === productId);
      if (productToAdd) {
        setCart(prevCart => [...prevCart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };
  
  const handleRemoveFromCart = (productId) => {
    
    const productIndex = cart.findIndex(item => item.idProduct === productId);
    
    if (productIndex !== -1 && cart[productIndex].quantity > 0) {
      
      setCart(prevCart => {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity -= 1;
        return updatedCart;
      });
    }
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
    <UIEcommerce>
      <Box mt={6} mb={6} ml={6} mr={6} > 
        <Typography variant='h3' gutterBottom>Products</Typography> 
        <Grid container spacing={3}>
          
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FiltersCard 
            />
          </Grid>

        
          <Grid item xs={12} sm={6} md={8} lg={8.5}>
            <Grid container spacing={3}>

            {products.rows.map(product => (
                <Grid item key={product.idProduct} xs={12} sm={12} md={6} lg={4}>
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
    </UIEcommerce>
  );
};
