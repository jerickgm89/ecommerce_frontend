import { Typography, Box } from '@mui/material';
import DetailProduct from '../components/DetailProduct';
import { products } from "../data"; 

export const DetailsProductsPage = () => {
  return (
    <Box mt={4} mb={4} ml={4} mr={4}>
      <Typography variant="h3" gutterBottom>Product Details</Typography>
      {products.map(product => (
        <DetailProduct key={product.id} product={product} /> 
      ))}
    </Box>
  );
};



