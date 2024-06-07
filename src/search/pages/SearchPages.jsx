import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSearchProductsByNameQuery } from '../../store/api';
import { Grid, Card, CardContent, Typography, Box, Link as MuiLink, Button, Pagination } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { useDispatch } from 'react-redux';
import Loading from '../../components/loading/Loading';
import { addToCart } from '../../store/cartShopping/cartSlice';

export const SearchPages = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const [page, setPage] = useState(1);
    
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const { data, isLoading, refetch, error } = useSearchProductsByNameQuery({
        name,
        pageIn: page,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (name) {
            setPage(1);
            refetch();
        }
    }, [name, refetch]);

    const totalPages = Math.ceil((data ? data.count : 0)/ 13);

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {}).format(parseFloat(price));
    };

    if (isLoading) return <Loading />;

    return (
        <EcommerceUI>
            <MuiLink component={Link} to="/" sx={{ margin: '50px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <ArrowBackIcon />
            </MuiLink>
            <Box 
                sx={{ 
                    mt: 8, 
                    mb: 8, 
                    ml: 8, 
                    mr: 8, 
                    minHeight: '60vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant='h4' gutterBottom>Resultados busqueda</Typography>
                <Grid container spacing={3} sx={{justifyContent:"center", mt:2}}>
                    {error ? (
                        <Box sx={{mt: 24}}>
                            <Typography variant='h4' color='textSecondary'>No se encontraron productos con el nombre: "{name}".</Typography>
                        </Box>
                    ) : (!data || data.rows.length === 0) ? (
                        <Typography variant='h6' color='textSecondary'>No se encontraron productos con el nombre "{name}".</Typography>
                    ) : (
                        data.rows.map((product) => (
                            <Grid item key={product.idProduct} xs={12} sm={6} md={4}>
                                <Card 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: { xs: 'column', sm: 'row' }, 
                                        height: '100%', 
                                        borderRadius: '8px', 
                                        boxShadow: "rgba(1, 0, 71, 0.7) 0px 1px 3px" 
                                    }}
                                >
                                    <Box 
                                        sx={{ 
                                            width: { xs: '100%', sm: '40%' }, 
                                            height: { xs: 'auto', sm: '100%' },
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            p: 1,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Link to={`/products/details/${product.idProduct}`} style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}>
                                           <Box
                                                sx={{
                                                    width: '100%',
                                                    paddingTop: '100%', 
                                                    position: 'relative'
                                                }}
                                            >
                                            <img
                                                src={product.imageProducts}
                                                alt={product.nameProduct}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '15px',
                                                  }}
                                            />
                                            </Box>
                                        </Link>
                                    </Box>
                                    <CardContent sx={{ width: { xs: '100%', sm: '60%' }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.nameProduct}
                                            </Typography>
                                            <Typography gutterBottom style={{ fontSize: "16px", marginBottom: '8px', fontWeight: 600, color: "#D23F57" }}>
                                                $ {formattedPrice(product.priceProduct)}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
                                            >
                                                {product.stockProduct > 0 ? 'Stock:' : 'Out of Stock'} {product.stockProduct} unidades
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', mt: 2 }}>
                                            <Button
                                                onClick={() => handleAddToCart((product))}
                                                variant="contained"
                                                sx={{ backgroundColor: "#2e8fea", color: "white" }}
                                            >
                                                Añadir al carrito
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
                <Grid container spacing={3} sx={{justifyContent:"center", mt:3}}>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    {totalPages > 0 && (
                        <Pagination 
                            count={totalPages} 
                            color="primary" 
                            page={page} 
                            onChange={handlePageChange} 
                            size="large" 
                        />
                    )}
                </Box>
                </Grid>
            </Box>
        </EcommerceUI>
    );
};

export default SearchPages;
