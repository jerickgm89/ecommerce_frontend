import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSearchProductsByNameQuery } from '../../store/api';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { EcommerceUI } from '../../ui';
import Loading from '../../components/loading/Loading';

export const SearchPages = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';

    const { data, isLoading, refetch, error } = useSearchProductsByNameQuery(name, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (name) {
            refetch();
        }
    }, [name, refetch]);

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {}).format(parseFloat(price));
    };

    if (isLoading) return <Loading/>;

    return (
        <EcommerceUI>
            <Box 
                sx={{ 
                    mt: 8, 
                    mb: 8, 
                    ml: 8, 
                    mr: 8, 
                    minHeight: '60vh', 
                    display: 'flex', 
                    flexDirection: 'column' 
                }}
            >
                <Typography variant='h4' gutterBottom>Resultados</Typography>
                <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {error ? (
                        <Box>
                        <Typography variant='h6' color='textSecondary'>No se encontraron productos con el nombre "{name}".</Typography>
                        </Box>
                    ) : (!data || data.rows.length === 0) ? (
                        <Typography variant='h6' color='textSecondary'>No se encontraron productos con el nombre "{name}".</Typography>
                    ) : (
                        data.rows.map((product) => (
                            <Grid item key={product.idProduct} xs={12} sm={6} md={4}>
                                <Card sx={{ width: '100%', display: 'flex', borderRadius: '10px' }}>
                                    <Box style={{ position: 'relative', width: '60%', aspectRatio: '4/3' }}>
                                        <Link to={`/products/details/${product.idProduct}`} style={{ textDecoration: 'none', display: 'block' }}>
                                            <img
                                                src={product.imageProducts}
                                                alt={product.nameProduct}
                                                style={{ width: '100%', aspectRatio: '4/3' }}
                                            />
                                        </Link>
                                    </Box>
                                    <CardContent style={{ flex: '1 0 auto' }}>
                                        <Typography
                                            gutterBottom
                                            style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
                                        >
                                            {product.nameProduct}
                                        </Typography>
                                        <Typography gutterBottom style={{ fontSize: '25px', fontWeight: 700, marginBottom: '8px', color: 'rgb(210, 63, 87)' }}>$ {formattedPrice(product.priceProduct)}</Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
                                        >
                                            {product.stockProduct > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Typography>
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
                                            >
                                                Add to Cart
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </EcommerceUI>
    );
};

export default SearchPages;
