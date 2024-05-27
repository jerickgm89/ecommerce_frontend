import { useState } from 'react';
import { Typography, Box, Grid, Button, Container, Tab, Tabs, Divider, TextField } from '@mui/material';
import { useDispatch } from 'react-redux'; // Importa useDispatch desde react-redux
import { addToCart } from '../../store/cartShopping/cartSlice';
import { ReviewList } from './ReviewList';
import { QuestionsProduct } from './QuestionsProduct';

const DetailProduct = ({ idProduct, nameProduct, priceProduct, descriptionProduct, imageProducts }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch(); // Obtiene la función de despacho

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formattedPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {}).format(parseFloat(price));
  };

  const handleAddToCart = () => { // Función para agregar el producto al carrito
    const product = {
      idProduct: idProduct,
      nameProduct: nameProduct,
      priceProduct: priceProduct,
      descriptionProduct: descriptionProduct,
      imageProducts: imageProducts,
    };
    dispatch(addToCart(product)); // Despacha la acción addToCart con los detalles del producto
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={imageProducts} alt={nameProduct} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px', color: '#373F50' }}>{nameProduct}</Typography>
          <Typography gutterBottom style={{ fontSize: '25px', fontWeight: 700, marginBottom: '8px', color: 'rgb(210, 63, 87)' }}>${formattedPrice(priceProduct)}</Typography>
          <Typography variant="body1" gutterBottom><strong>Description:</strong> {descriptionProduct}</Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: "rgb(210, 63, 87)",
                color: "rgb(255, 255, 255)",
                cursor: "pointer",
                fontWeight: 600,
                borderRadius: "6px",
                textTransform: 'capitalize',
                transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                '&:hover': {
                  backgroundColor: "rgb(210, 63, 87)",
                }
              }}
              onClick={handleAddToCart} // Llama a la función handleAddToCart cuando se hace clic en el botón
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>

        {/* <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Description and Review tabs"
              indicatorColor="secondary"
              textColor="secondary"
            >

              <Tab label="Descripcion" sx={{ textTransform: 'none' }} />
              <Tab label="Comentarios" sx={{ textTransform: 'none' }} />
              <Tab label="Reseña" sx={{ textTransform: 'none' }} />
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <Box p={3}>
              <Typography variant="body1" gutterBottom><strong>Descripcion:</strong> {descriptionProduct}</Typography>
            </Box>
          )}
          {tabValue === 1 && (
            <Box p={3}>
              <Typography variant="body1" gutterBottom><strong>Comentarios</strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eveniet distinctio ipsa cumque ab dolore, quod pariatur deserunt, mollitia iste similique tempore delectus magnam facere inventore accusamus fugiat officiis cum.
              </Typography>
            </Box>
          )}
          {tabValue === 2 && (
            <Box p={3}>

              <ReviewList />
            </Box>
          )}
        </Box> */}
      </Grid>
      <Divider sx={{mt:2}}/>
      <Box p={3}>
              <Typography variant="body1" gutterBottom><strong>Descripcion:</strong> {descriptionProduct}</Typography>
            </Box>
      <Divider sx={{mt:2}}/>
      <QuestionsProduct />
      <Divider sx={{mt:2, mb:3}}/>
      <ReviewList />
    </Container>
  );
};

export default DetailProduct;
