import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Button } from "@mui/material";
import { EcommerceUI } from "../../ui";
import { useGetProductsQuery } from '../../store/api';
import Carousel from 'react-material-ui-carousel';
import { BrandsProductsHome, CategoryProductsHome, ProductsHome, DealsHome } from '../components';
import ProductCard from '../../products/components/ProductCard';

export const HomePage = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  // Asegúrate de manejar los estados de carga y error adecuadamente
  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  // Obtén solo los primeros 9 productos
  const firstNineProducts = data.slice(0, 9);

  if (!firstNineProducts) return null;

  // Aquí puedes decidir cuántos productos quieres mostrar por "slide"
  const itemsPerSlide = 3;
  const carouselItems = firstNineProducts.reduce((acc, item, idx) => {
    const chunkIndex = Math.floor(idx / itemsPerSlide);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []; // start a new chunk
    }

    acc[chunkIndex].push(item);

    return acc;
  }, []);

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

  return (
    <EcommerceUI>
      <Box mt={8} mb={8} ml={8} mr={8} sx={{ backgroundColor: "#F6F9FC" }}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} marginTop={5} marginBottom={5} marginLeft={2}>
            <Typography variant="h5" gutterBottom>
              Ofertas del día
            </Typography>
            <DealsHome />
          </Grid> */}

          <Grid item xs={12} marginTop={5} marginBottom={5}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item marginLeft={2}>
                <Typography variant="h5" gutterBottom>
                  Productos
                </Typography>
              </Grid>
              <Grid item marginRight={2}>
                <Link to={'/products'} style={{ textDecoration: 'none' }}>
                  <Button sx={{ backgroundColor: 'primary.main', transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#277AC9' }, color: '#F3F3F3' }}>Todos los productos</Button>
                </Link>
              </Grid>
            </Grid>
            <Carousel>
              {carouselItems.map((chunk, index) => (
                <Grid container spacing={1} key={index} justifyContent={'center'}>
                  {chunk.map(product => (
                    <Grid item xs={4} sm={6} md={4} lg={3} key={product.idProduct} marginTop={5}>
                      <ProductCard
                        product={product}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                      />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} marginTop={5} marginBottom={5} marginLeft={2}>
            <Typography variant="h5" gutterBottom>Marcas</Typography>
            <BrandsProductsHome />
          </Grid>
          <Grid item xs={12} marginTop={5} marginBottom={5} marginLeft={2}>
            <Typography variant="h5" gutterBottom>Categorias</Typography>
            <CategoryProductsHome />
          </Grid>
        </Grid>
      </Box>
    </EcommerceUI>
  );
};