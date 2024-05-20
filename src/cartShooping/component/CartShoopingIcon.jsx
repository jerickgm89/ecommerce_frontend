import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Box } from '@mui/material';

const CartShoppingIcon = () => {
    // Obtener el estado del carrito desde Redux
    const { cartTotalQuantity } = useSelector(state => state.cart);

    return (
        <Box mt={2.2} ml={1}>
            <Badge badgeContent={cartTotalQuantity} color="secondary">
                <ShoppingCartIcon aria-label="shopping cart" sx={{ color: '#000000' }} />
            </Badge>
        </Box>
    );
};

export default CartShoppingIcon;