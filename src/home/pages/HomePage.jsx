import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import { EcommerceUI } from "../../ui";
import { useFilterProductsQuery } from '../../store/api';
import Carousel from 'react-material-ui-carousel';
import { BrandsProductsHome, CategoryProductsHome, ProductsHome, DealsHome } from '../components';
import ProductCard from '../../products/components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import { ImageSlider } from '../components/ImageSlider';
import { BannerInfo } from '../components/BannerInfo';
import { BannerItems } from '../components/BannerItems';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';


export const HomePage = () => {
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
    category: category,
    brand: brand,
    pageIn: 1,
  }, {
    refetchOnMountOrArgChange: true});

  // Asegúrate de manejar los estados de carga y error adecuadamente
  if (isError) {
    return <Typography variant="h3">Error: {error.message}</Typography>;
  }
  if (isLoading) return <Loading />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  // Obtén solo los primeros 9 productos
  const firstNineProducts = products.rows.slice(0, 8);

  if (!firstNineProducts) return null;

  // Aquí puedes decidir cuántos productos quieres mostrar por "slide"
  const itemsPerSlide = 4;
  const carouselItems = firstNineProducts.reduce((acc, item, idx) => {
    const chunkIndex = Math.floor(idx / itemsPerSlide);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []; // start a new chunk
    }

    acc[chunkIndex].push(item);

    return acc;
  }, []);

  return (
    <EcommerceUI>
      <ImageSlider />
      <BannerItems/>
      <Divider />
      <BannerInfo/>
      <Divider />
      

        <Box mt={8} mb={8}>

        <Grid item xs={12} marginTop={5} marginBottom={5} marginLeft={2}>
              <CategoryProductsHome />
            </Grid>


          <Grid container spacing={3}>
            {/* <Grid item xs={12} marginTop={5} marginBottom={5} marginLeft={2}>
              <Typography variant="h5" gutterBottom>
                Ofertas del día
              </Typography>
              <DealsHome />
            </Grid> */}
            
            


            <Grid item xs={12} marginTop={5} >
              <Grid container justifyContent="end" alignItems="center">
                {/* <Grid item marginLeft={2}>
                  <Typography variant="h5" gutterBottom>
                    Productos
                  </Typography>
                </Grid> */}
                <Grid item marginRight={6}>
                  <Link to={'/products'} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#2B3445',
                      fontSize: '14px',
                      transition: 'color 0.3s',
                      '&:hover': { color: '#4a4a4a' },
                      position: 'relative',

                      '&:hover::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        bottom: '-2px',
                        left: 0,
                        backgroundColor: '#4a4a4a',
                        transform: 'scaleX(1)',
                        transition: 'transform 0.3s ease',
                        transformOrigin: 'bottom left',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        bottom: '-2px',
                        left: 0,
                        backgroundColor: '#4a4a4a',
                        transform: 'scaleX(0)',
                        transition: 'transform 0.3s ease',
                        transformOrigin: 'bottom left',
                      }
                    }}
                  >
                    Más productos <ArrowForwardOutlinedIcon sx={{ ml: 1 }} />
                  </Typography>
                  </Link>
                </Grid>
              </Grid>
              <Carousel>
                {carouselItems.map((chunk, index) => (
                  <Grid container spacing={1} key={index} justifyContent={'center'}>
                    {chunk.map(product => (
                      <Grid item key={product.idProduct} xs={12} sm={12} md={4} lg={2.5} marginTop={5}>
                        <ProductCard
                          product={product}
                          dispatch={dispatch}
                          cart={cart}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Carousel>
            </Grid>

            <Grid item xs={12} marginTop={5} marginBottom={5} marginLeft={2}>
              {/* <Typography variant="h5" gutterBottom>Marcas</Typography> */}
              <BrandsProductsHome />
            </Grid>
           
          </Grid>
        </Box>
    </EcommerceUI>
  );
};