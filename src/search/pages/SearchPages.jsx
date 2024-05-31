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
 
                               <Card sx={{ display: 'flex', flexDirection: 'row', height: '100%',borderRadius: '8px', boxShadow:"rgba(1, 0, 71, 0.7) 0px 1px 3px",  }}>
                                    <Box sx={{ width: '40%', overflow: 'hidden' }}>
                                        <Link to={`/products/details/${product.idProduct}`} style={{ textDecoration: 'none', display: 'block' }}>
                                            <img
                                                src={product.imageProducts}
                                                alt={product.nameProduct}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', minWidth: '150px', padding: '10px'}}
                                            />
                                        </Link>
                                    </Box>
                                    <CardContent sx={{ width: '60%' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.nameProduct}
                                        </Typography>
                                        <Typography gutterBottom style={{ fontSize:"16px", marginBottom: '8px', fontWeight:600, color:"#D23F57" }} >
                                            $ {formattedPrice(product.priceProduct)}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
                                        >
                                            {product.stockProduct > 0 ? 'Stock:' : 'Out of Stock'} {product.stockProduct} unidades
                                        </Typography >
                                        <Box sx={{ display: 'flex', mb:2 , mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: "rgb(210, 63, 87)", color: "white" }}
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
