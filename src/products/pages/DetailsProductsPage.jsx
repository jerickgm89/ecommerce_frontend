import { Typography, Box } from '@mui/material';
import DetailProduct from '../components/DetailProduct';
import { useParams } from 'react-router-dom';
import { EcommerceUI } from '../../ui';
import { useGetProductByIdQuery } from '../../store/api/ecommerceApi';

export const DetailsProductsPage = () => {
  
  const { id } = useParams();

  const { data: product = [], isLoading} = useGetProductByIdQuery(id)

  
  if (!product) {
    return <Typography variant="h3">Product not found</Typography>;
  }

  return (
    
      <EcommerceUI>
        <Box mt={4} mb={4} ml={4} mr={4}>
          <Typography variant="h3" gutterBottom>Product Details</Typography>
          <DetailProduct
            idProduct = {product.idProduct}
            nameProduct = {product.nameProduct}
            priceProduct = {product.priceProduct}
            descriptionProduct = {product.descriptionProduct}
            imageProducts = {product.imageProducts}
          /> 
        </Box>
      </EcommerceUI>
  );
};


