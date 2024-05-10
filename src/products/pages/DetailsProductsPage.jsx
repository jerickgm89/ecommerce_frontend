import { Typography, Box } from '@mui/material';
import DetailProduct from '../components/DetailProduct';
import { products } from "../data"; 
import { useParams } from 'react-router-dom';
import { UIEcommerce } from '../../ui';

export const DetailsProductsPage = () => {
  
  const { productId } = useParams();

  const product = products.find(product => product.id === parseInt(productId));

  
  if (!product) {
    return <Typography variant="h3">Product not found</Typography>;
  }

  return (
    <>
      <UIEcommerce>
        <Box mt={4} mb={4} ml={4} mr={4}>
          <Typography variant="h3" gutterBottom>Product Details</Typography>
          <DetailProduct product={product} /> 
        </Box>
      </UIEcommerce>
    </>
  );
};


