import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Link as MuiLink, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DetailProduct from '../components/DetailProduct';
import { useParams } from 'react-router-dom';
import { EcommerceUI } from '../../ui';
import { useGetProductByIdQuery, useGetCategoriesQuery, useGetBrandsQuery } from '../../store/api/ecommerceApi';

export const DetailsProductsPage = () => {
  
  const { id } = useParams();

  const { data: product = [], isLoading} = useGetProductByIdQuery(id)
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);


  useEffect(() => {
    if (categories) {
      const foundCategory = categories.find(cat => cat.idCategory === product.idCategory);
      setCategory(foundCategory);
    }
  }, [categories, product]);


  useEffect(() => {
    if (brands) {
      const foundBrand = brands.find(brand => brand.idBrand === product.characteristicsProduct?.idBrand);
      setBrand(foundBrand);

    }
  }, [brands, product]);

  if (!product) {
    return <Typography variant="h3">Product not found</Typography>;

    
  }

  console.log("Image URLs:", product.imageProducts);


  return (
    
      <EcommerceUI>
        <MuiLink component={Link} to="/" sx={{ margin: '50px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ArrowBackIcon />
        </MuiLink>
        <Box mt={8} mb={8} ml={8} mr={8}>
          <Typography variant="h3" gutterBottom>Detalle productos</Typography>
          <DetailProduct 
            idProduct = {product.idProduct}
            nameProduct = {product.nameProduct}
            priceProduct = {product.priceProduct}
            discountPriceProduct = {product.discountPriceProduct}
            descriptionProduct = {product.descriptionProduct}
            imageProducts = {product.imageProducts}
            stockProduct = {product.stockProduct}
            categoryName = {category?.nameCategory}
            categoryId = {category?.idCategory}
            brandId = {brand?.idBrand}
            brandName = {brand?.nameBrand}
            brandLogo = {brand?.logoBrand}

            characteristicsProduct = {product.characteristicsProduct}
       
          /> 
        </Box>
      </EcommerceUI>
  );
};


