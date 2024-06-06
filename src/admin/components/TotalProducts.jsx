import { useGetProductsQuery } from "../../store/api";
import { Typography, Paper, Box, Grid, Avatar } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

export const TotalProducts = () => {
    const { data: products } = useGetProductsQuery();

    
    const activeProducts = Array.isArray(products) ? products.filter(product => product.active) : [];
    const inactiveProducts = Array.isArray(products) ? products.filter(product => !product.active) : [];

    return (
        <Box mb={2}>
            <Paper elevation={3} sx={{ borderRadius: '30px', padding: '20px', backgroundColor: '#ba68c8', display: 'flex', alignItems: 'center'  }}>
                <Grid container alignItems="center">
                    <Avatar style={{ backgroundColor: '#9575cd', marginRight: '16px' }}>
                        <ShoppingCartIcon style={{ color: '#FFFFFF' }} />
                    </Avatar>
                    <Grid item xs={12} md>
                        <Typography variant="h6"  color="textPrimary">Productos en la tienda</Typography>
                        <Typography variant="body1" color="textSecondary">Total: {products ? products.length : 0}</Typography>
                        <Typography variant="body1" color="textSecondary" >Productos disponibles: {activeProducts.length}</Typography>
                        <Typography variant="body1" color="textSecondary">No disponibles: {inactiveProducts.length}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
