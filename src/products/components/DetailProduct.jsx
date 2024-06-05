import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Grid, Button, Container, Tab, Tabs, Divider } from '@mui/material';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../../store/cartShopping/cartSlice';
import { ReviewList } from './ReviewList';
import { QuestionsProduct } from './QuestionsProduct';
import { QueryClientProvider, QueryClient } from 'react-query';
import { QuestionsList } from './QuestionsList';
import Carousel from 'react-material-ui-carousel';

const DetailProduct = ({ idProduct, nameProduct, priceProduct, discountPriceProduct, descriptionProduct, imageProducts, stockProduct, characteristicsProduct, categoryName, categoryId, brandId, brandName, brandLogo }) => {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch(); 
  const [showFullDescription, setShowFullDescription] = useState(false);

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
      stockProduct: stockProduct,
    };
    dispatch(addToCart(product)); // Despacha la acción addToCart con los detalles del producto
  };

  const queryClient = new QueryClient();

  const images = Array.isArray(imageProducts) ? imageProducts : [];

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '15px',
              marginRight: '20px'
            }}
          >
            {images && images.length > 0 ? (
              
              <Carousel
                navButtonsAlwaysVisible={images.length > 1}
                navButtonsProps={{
                  style: {
                    backgroundColor: 'transparent',
                    color: 'black',
                  },
                // autoplay: false,
              }}
              >
                {images.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative', width: '100%', height: 0, paddingTop: '100%', overflow: 'hidden', justifyContent:"center" }}>
                    
                    <img
                      src={image}
                      alt={`${nameProduct} ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%', 
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'opacity 0.5s ease-in-out',
                      }}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </Box>
                ))}
              </Carousel>
            ) : (
              <Typography variant="body2" color="textSecondary">No image available</Typography>
              
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={`/products/brand/${brandId}`}>
            <img src={brandLogo} alt={brandName} style={{ width: 100, marginRight: 10 }} />
          </Link>
          <Typography gutterBottom style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px', color: '#373F50' }}>{nameProduct}</Typography>
          <Link to={`/products/category/${categoryId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'rgb(174, 180, 190)' }}>
              Categoría: {categoryName}
            </Typography>
          </Link>

          {discountPriceProduct ? (
            <>
              <Typography variant="body1" component="span" style={{ textDecoration: 'line-through' }}>
                $ {formattedPrice(priceProduct)}
              </Typography>
              <Typography style={{ fontSize: '25px', fontWeight: 700, marginBottom: '8px', color: 'rgb(210, 63, 87)' }}>
                $ {formattedPrice(discountPriceProduct)} -{Math.round(((priceProduct - discountPriceProduct) / priceProduct) * 100)}%
              </Typography>
            </>
          ) : (
            <Typography style={{ fontSize: '25px', fontWeight: 700, marginBottom: '8px', color: 'rgb(210, 63, 87)' }}>
              $ {formattedPrice(priceProduct)}
            </Typography>
          )}

          <Typography
            gutterBottom
            style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
          >
            {stockProduct > 0 ? 'Stock:' : 'Out of Stock'} {stockProduct} unidades
          </Typography >

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
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Description and Review tabs"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="Descripción" sx={{ textTransform: 'none' }} />
              <Tab label="Características" sx={{ textTransform: 'none' }} />
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <Box p={3}>
              <Typography variant="body1" gutterBottom sx={{textAlign:"justify"}}>
                <strong>Descripción: </strong> 
                {descriptionProduct ? (
                  showFullDescription ? (
                    <span>{descriptionProduct} <Button onClick={() => setShowFullDescription(false)}>Ver menos</Button></span>
                  ) : (
                    <span>
                      {descriptionProduct.slice(0, 500)}...
                      <Button onClick={() => setShowFullDescription(true)}>Ver más</Button>
                    </span>
                  )
                ) : (
                  ' No hay descripción disponible.'
                )}
              </Typography>
            </Box>
          )}
          {tabValue === 1 && (
            <Box p={3}>
              <Typography variant="body1" gutterBottom><strong>Características:</strong></Typography>
              {characteristicsProduct && characteristicsProduct.characteristics ? (
                <ul>
                  {Object.entries(characteristicsProduct.characteristics).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2" gutterBottom>No hay características disponibles.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Grid>

      <Divider sx={{mt:2}}/>

      <QuestionsProduct />
      <QueryClientProvider client={queryClient}>
        <QuestionsList />
        <Divider sx={{mt:2, mb:3}}/>
        <ReviewList />
      </QueryClientProvider>
    </Container>
  );
};

export default DetailProduct;