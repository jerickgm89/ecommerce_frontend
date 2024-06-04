import { AdminLayout } from '../layout/AdminLayout';
import { ChartReview, LastRegisteredUsers, TotalProducts, TotalReviews, TotalUsers } from '../components';
import { Typography, Box, Grid } from '@mui/material';

export const MetricsDashPage = () => {
    
    return (
        <AdminLayout>
            <Box m={2}>
                {/* Encabezado */}
                <Typography variant="h2" fontWeight="bold" mb={2}>
                    Dashboard
                </Typography>
                <Typography variant="h5" mb={4}>
                    Métricas de la tienda
                </Typography>

                <Grid container spacing={2}>
                    {/* Sección de Totales */}
                    <Grid item xs={12} lg={4}>
                        <Box mb={4}>
                            <Typography variant="h4" mb={2}>
                                Totales
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TotalUsers />
                                </Grid>
                                <Grid item xs={6}>
                                    <TotalProducts />
                                </Grid>
                                <Grid item xs={6}>
                                    <TotalReviews/>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Sección de Gráficos */}
                    <Grid item xs={12} lg={8}>
                        <Box mb={4}>
                            <Typography variant="h4" mb={2}>
                                Gráficos
                            </Typography>
                            <ChartReview />
                            
                        </Box>
                    </Grid>

                    {/* Sección de Nuevos Usuarios */}
                    <Grid item xs={12} lg={5}>
                        <Box mb={4}>
                            <Typography variant="h4" mb={2}>
                                Nuevos Usuarios
                            </Typography>
                            <LastRegisteredUsers />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </AdminLayout>
    )
}
