import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button, IconButton, Link as MuiLink, Divider } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux'; // Importa useSelector de react-redux
import { addToCart, clearCart, decreaseCart, removeFromCart } from '../../store/cartShopping/cartSlice';

export const CartShoppingPage = () => {
    const { cartItems, cartTotalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // Función para eliminar un producto del carrito
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    };
  
    // Función para disminuir la cantidad de un producto en el carrito
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart({ id: product.idProduct, priceProduct: product.priceProduct }));
    };
  
    // Función para aumentar la cantidad de un producto en el carrito
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
  
    // Función para vaciar el carrito
    const handleClearCart = () => {
      // Implementa la lógica para vaciar el carrito
      dispatch(clearCart());
    };

    const formattedPrice = (price) => {
      return new Intl.NumberFormat('es-ES', {}).format(parseFloat(price));
    };

  return (
    <EcommerceUI>
      <Box sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: 1200, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>
          Carrito de compras
        </Typography>
        
        {cartItems.length === 0 ? ( // Cambia cart.products por cartItems
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

                  {cartItems.map((cartItem) => ( // Cambia cart.products por cartItems
                    <Grid container spacing={2} key={cartItem.idProduct} alignItems="center" sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                          <img src={cartItem.imageProducts} alt={cartItem.nameProduct} width="80" height="80" />
                          <Box ml={2}>
                            <Typography variant="subtitle1">{cartItem.nameProduct}</Typography>
                            {/* <Typography variant="body2">{cartItem.descriptionProduct}</Typography> */}
                            <Button variant="text" color="secondary" onClick={() => handleRemoveFromCart(cartItem.idProduct)}>Eliminar</Button>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1" textAlign="center">$ {formattedPrice(cartItem.priceProduct)}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <IconButton onClick={() => handleDecreaseCart(cartItem)}>-</IconButton>
                          <Typography variant="body1" mx={1}>{cartItem.quantity}</Typography>
                          <IconButton onClick={() => handleAddToCart(cartItem)}>+</IconButton>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="body1" textAlign="center">$ {formattedPrice(cartItem.priceProduct * cartItem.quantity)}</Typography>
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
                    <Typography variant="h6">$ {formattedPrice(cartTotalAmount)}</Typography> {/* Cambia cart.total por cartTotalAmount */}
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