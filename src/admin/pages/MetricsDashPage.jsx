import { AdminLayout } from '../layout/AdminLayout';
import { ChartReview, LastRegisteredUsers, TotalProducts, TotalReviews, TotalUsers, ChartTopSellingProducts, TotalIncomes } from '../components';
import { Typography, Box, Grid } from '@mui/material';

export const MetricsDashPage = () => {
    
    return (
        <AdminLayout>
            <Box m={2}>
                <Typography variant="h2" fontWeight="bold" mb={2}>
                    Dashboard
                </Typography>
                <Typography variant="h5" mb={4}>
                    Métricas de la tienda
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box mb={4}>
                           
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TotalUsers />
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TotalIncomes/>   
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TotalReviews/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <TotalProducts />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box mb={4}>
                         
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <ChartReview />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ChartTopSellingProducts /> 
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box mb={4}>
                           
                            <LastRegisteredUsers />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </AdminLayout>
    )
}
