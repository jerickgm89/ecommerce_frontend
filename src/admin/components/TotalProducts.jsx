import { useGetProductsQuery } from "../../store/api";
import { Typography, Paper, Box, Avatar } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';

export const TotalProducts = () => {
    const { data: products } = useGetProductsQuery();

    // Contar la cantidad de productos activos e inactivos
    const activeProducts = Array.isArray(products) ? products.filter(product => product.active) : [];
    const inactiveProducts = Array.isArray(products) ? products.filter(product => !product.active) : [];

    return (
        <Box mb={2}>
            <Paper elevation={3} style={{ padding: '16px', borderRadius:'30px', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: '#3f51b5', marginRight: '16px' }}>
                    <GroupIcon />
                </Avatar>
                <Box>
                    <Typography variant="h6">Productos en la tienda</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Total: {products ? products.length : 0}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Productos disponibles: {activeProducts.length}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">No disponibles: {inactiveProducts.length}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};
