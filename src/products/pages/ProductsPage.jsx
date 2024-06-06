import React, { useState } from 'react';
import { Typography, Grid, Box, Link as MuiLink, Divider} from '@mui/material';
import ProductCard from '../components/ProductCard';
import FiltersCard from '../components/FiltersCard';
import { EcommerceUI } from '../../ui';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFilterProductsQuery, useGetCategoriesQuery, useGetBrandsQuery } from '../../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../../store/cartShopping/cartSlice';
import Loading from '../../components/loading/Loading';
import { BannerInfo, BannerItems, CategoryProductsHome} from '../../home/components';
import { BrandsProductsHome } from '../../home/components';

// ErrorBoundary component to catch and handle errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    // console.log("ERROR %%%%", error)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Typography variant="h3">Algo salió mal.</Typography>;
    }

    return this.props.children; 
  }
}

export const ProductsPage = () => {
  const { idCategory, idBrand } = useParams();

  const [openCategories, setOpenCategories] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const { data: products, isError, isLoading, error } = useFilterProductsQuery({
    name: '',
    price: '',
    priceMin: priceMin,
    priceMax: priceMax,
    year: '',
    orderBy: orderBy,
    orderDirection: orderDirection,
    category: idCategory ? idCategory : category,
    brand: idBrand ? idBrand : brand 
  });

  const { data: categoryData } = useGetCategoriesQuery(idCategory); 
  const { data: brandData } = useGetBrandsQuery(idBrand);

  const categoryName = categoryData ? categoryData.nameCategory : '';
  const brandName = brandData ? brandData.nameBrand : '';

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

  return (
    <EcommerceUI>
      <MuiLink component={Link} to="/" sx={{ margin: '50px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <ArrowBackIcon />
      </MuiLink>
      <ErrorBoundary>
        {/* <Divider sx={{backgroundColor:"white"}}/>
        <BannerItems/>
        <Divider />
        <BannerInfo/>
        <Divider /> */}

        <Box m={8}  >
          {/* <Typography variant='h3' gutterBottom>Products</Typography> */}
          

          {idCategory && (
            <Box mb={4}>
              <CategoryProductsHome categoryId={idCategory} />
            </Box>
          )}
          {idBrand && (
            <Box mb={4}>
              <BrandsProductsHome brandId={idBrand} />
            </Box>
          )}


          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FiltersCard 
                openCategories={openCategories} 
                handleCategoriesClick={handleCategoriesClick} 
                applyPriceFilter={applyPriceFilter}
                applySorting={applySorting}
                applyCategoryFilter={applyCategoryFilter}
                applyBrandFilter={applyBrandFilter}
                idCategory={idCategory}
                idBrand={idBrand}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={8} lg={9}>
              
             

              <Grid container spacing={3} justifyContent="center">
                {isError ? (
                  <Typography variant="h6" textAlign="center" m={30} sx={{ color: 'error.main' }}>No se encontraron productos con el filtro aplicado {error.message}</Typography>
                ) : isLoading ? (
                  <Loading/>
                ) : !products ? (
                  <Typography variant="h3">Cargando la información...</Typography>
                ) : (
                  products.rows.map(product => (
                    <Grid item key={product.idProduct} xs={12} sm={12} md={4.5} lg={3.1}>
                      <ProductCard
                        product={product}
                        dispatch={dispatch}
                        cart={cart}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ErrorBoundary>
    </EcommerceUI>
  );
};
