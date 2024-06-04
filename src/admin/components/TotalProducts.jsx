import { useGetProductsQuery } from "../../store/api";
import { Typography, Paper, Box, Grid, Avatar } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

export const TotalProducts = () => {
    const { data: products } = useGetProductsQuery();

    // Contar la cantidad de productos activos e inactivos
    const activeProducts = Array.isArray(products) ? products.filter(product => product.active) : [];
    const inactiveProducts = Array.isArray(products) ? products.filter(product => !product.active) : [];

    return (
        <Box mb={2}>
            <Paper elevation={3} sx={{ borderRadius: '30px', padding: '20px', backgroundColor: '#f0f0f0'  }}>
                <Grid container alignItems="center">
                    <Avatar style={{ backgroundColor: '#ff7043', marginRight: '16px' }}>
                        <ShoppingCartIcon style={{ color: '#FFFFFF' }} />
                    </Avatar>
                    <Grid item xs={12} md>
                        <Typography variant="h6" gutterBottom color="textPrimary">Productos en la tienda</Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>Total: {products ? products.length : 0}</Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>Productos disponibles: {activeProducts.length}</Typography>
                        <Typography variant="body1" color="textSecondary">No disponibles: {inactiveProducts.length}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
