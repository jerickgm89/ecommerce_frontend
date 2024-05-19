import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, IconButton, Link as MuiLink, Divider } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const CartShoppingPage = () => {
  const [cart, setCart] = useState({ products: [], total: 0 });

  useEffect(() => {
    
    fetch('https://dummyjson.com/carts/2') 
      .then(response => response.json())
      .then(data => setCart(data));
  }, []);

  //* Cambiar product.id por product.idProduct
  //* Cambiar el mapeo por lo que va 
  //* Cambiar dentro del return para que muestre los datos correctos 
 // (title, description, price, thumbnail, quantity) (nameProduct, descriptionProduct, priceProduct, imageProducts, quantity)

  // Actualiza el total del carrito y el estado del carrito con los productos actualizados
  const updateCartTotal = (products) => {
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setCart({ ...cart, products, total });
  };


  const handleRemoveFromCart = (cartItem) => {
    const updatedProducts = cart.products.filter(product => product.id !== cartItem.id);
    updateCartTotal(updatedProducts);
  };

  const handleDecreaseCart = (cartItem) => {
    const updatedProducts = cart.products.map(product => {
      if (product.id === cartItem.id) {
        return { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 1 };
      }
      return product;
    });
    updateCartTotal(updatedProducts);
  };

  const handleAddToCart = (cartItem) => {
    const updatedProducts = cart.products.map(product => {
      if (product.id === cartItem.id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateCartTotal(updatedProducts);
  };

  const handleClearCart = () => {
    setCart({ products: [], total: 0 });
  };

  return (
    <EcommerceUI>
      <Box sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: 1200, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>
          Carrito de compras
        </Typography>
        
        {cart.products.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 80 }} />
            <Typography variant="h6" mt={2}>Agregá productos para armar tu carrito</Typography>
            <Box mt={2}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                startIcon={<ArrowBackIcon />}
              >
                Empezar a comprar
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Productos</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h6" textAlign="center">Precio</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h6" textAlign="center">Cantidad</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="h6" textAlign="center">Total</Typography>
                    </Grid>
                  </Grid>

                  {cart.products.map((cartItem) => (
                    <Grid container spacing={2} key={cartItem.id} alignItems="center" sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                          <img src={cartItem.thumbnail} alt={cartItem.title} width="80" height="80" />
                          <Box ml={2}>
                            <Typography variant="subtitle1">{cartItem.title}</Typography>
                            <Typography variant="body2">{cartItem.description}</Typography>
                            <Button variant="text" color="secondary" onClick={() => handleRemoveFromCart(cartItem)}>Eliminar</Button>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1" textAlign="center">${cartItem.price}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <IconButton onClick={() => handleDecreaseCart(cartItem)}>-</IconButton>
                          <Typography variant="body1" mx={1}>{cartItem.quantity}</Typography>
                          <IconButton onClick={() => handleAddToCart(cartItem)}>+</IconButton>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1" textAlign="center">${cartItem.price * cartItem.quantity}</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>Resumen de compra</Typography>
                  <Divider sx={{ mb: 2 }}/>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">Subtotal</Typography>
                    <Typography variant="h6">${cart.total}</Typography>
                  </Box>

                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Continuar compra</Button>
                  <Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={handleClearCart}>Vaciar carrito</Button>
                  <Box mt={2}>
                    <MuiLink component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                      <ArrowBackIcon />
                      <Typography variant="button" ml={1}>Seguir comprando</Typography>
                    </MuiLink>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </EcommerceUI>
  );
};

export default CartShoppingPage;
