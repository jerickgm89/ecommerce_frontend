import { Typography, Box } from '@mui/material';
import DetailProduct from '../components/DetailProduct';
import { useParams } from 'react-router-dom';
import { UIEcommerce } from '../../ui';
import { useGetProductByIdQuery } from '../../store/api'


export const DetailsProductsPage = () => {
  
  const { productId } = useParams();

  const { data: productData, isError, isLoading, error } = useGetProductByIdQuery(productId);

  if (isError) {
    return <Typography variant="h3">Error: {error.message}</Typography>;
  }
  
  if (isLoading) {
    return <Typography variant="h3">Loading...</Typography>;
  }
  
  if (!productData) {
    return <Typography variant="h3">Waiting for data...</Typography>;
  }
  
  if (!productData) {
    return <Typography variant="h3">Product not found</Typography>;
  }

  return (
    <>
      <UIEcommerce>
        <Box mt={4} mb={4} ml={4} mr={4} >
          <Typography variant="h3" gutterBottom>Details</Typography>
          <DetailProduct product={productData} /> 
        </Box>
      </UIEcommerce>
    </>
  );
};


