import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, IconButton, Link as MuiLink, Divider } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart, decreaseCart, removeFromCart } from '../../store/cartShopping/cartSlice';
import { setShippingInfo } from '../../store/shippingInfo/shippingInfoSlice';

export const CartShoppingPage = () => {
    const { cartItems, cartTotalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    };

    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart({ idProduct: product.idProduct, priceProduct: product.priceProduct }));
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {}).format(parseFloat(price));
    };

    const handleContinue = () => {
        if (isAuthenticated) {
            navigate('/shippingInfo');
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Regístrate para continuar',
                text: 'Debes iniciar sesión para continuar con la compra.',
                showCancelButton: true,
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    loginWithRedirect('/shippingInfo');
                }
            });
        }
    };

    return (
        <EcommerceUI>
            <MuiLink component={Link} to="/" sx={{ margin: '50px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <ArrowBackIcon />
            </MuiLink>
            <Box sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: 1200, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom>
                    Carrito de compras
                </Typography>
                {cartItems.length === 0 ? (
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

                                    {cartItems.map((cartItem) => (
                                        <Grid container spacing={2} key={cartItem.idProduct} alignItems="center" sx={{ mb: 2 }}>
                                            <Grid item xs={6}>
                                                <Box display="flex" alignItems="center">
                                                    <img src={cartItem.imageProducts} alt={cartItem.nameProduct} width="80" height="80" />
                                                    <Box ml={2}>
                                                        <Typography variant="subtitle1">{cartItem.nameProduct}</Typography>
                                                        <Button variant="text" color="secondary" onClick={() => handleRemoveFromCart(cartItem.idProduct)}>Eliminar</Button>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {cartItem.discountPriceProduct ? (
                                                    <>
                                                        <Typography variant="body1" textAlign="center" sx={{ textDecoration: 'line-through' }}>
                                                            $ {formattedPrice(cartItem.priceProduct)}
                                                        </Typography>
                                                        <Typography variant="body1" textAlign="center" sx={{ color: 'red' }}>
                                                            $ {formattedPrice(cartItem.discountPriceProduct)}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography variant="body1" textAlign="center">
                                                        $ {formattedPrice(cartItem.priceProduct)}
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Box display="flex" justifyContent="center" alignItems="center">
                                                    <IconButton onClick={() => handleDecreaseCart(cartItem)}>-</IconButton>
                                                    <Typography variant="body1" mx={1}>{cartItem.quantity}</Typography>
                                                    <IconButton onClick={() => handleAddToCart(cartItem)}>+</IconButton>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {cartItem.discountPriceProduct ? (
                                                    <Typography variant="body1" textAlign="center">
                                                        $ {formattedPrice(cartItem.discountPriceProduct * cartItem.quantity)}
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="body1" textAlign="center">
                                                        $ {formattedPrice(cartItem.priceProduct * cartItem.quantity)}
                                                    </Typography>
                                                )}
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
                                        <Typography variant="h6">$ {formattedPrice(cartTotalAmount)}</Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        onClick={handleContinue}
                                    >
                                        Continuar compra
                                    </Button>
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
