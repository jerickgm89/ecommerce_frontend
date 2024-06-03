
import { AdminLayout } from '../layout/AdminLayout';
import { ChartReview, LastRegisteredUsers, TotalProducts, TotalUsers } from '../components';
import { Typography, Box, Button } from '@mui/material';


export const MetricsDashPage= () => {
    
    return (
        <AdminLayout>
         <Box m="20px">
            
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box mb="30px">
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{ m: "0 0 5px 0" }}
                >
                    Dashboard
                </Typography>
                <Typography variant="h5">
                    Metricas de la tienda
                </Typography>
                
               
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
              
                <ChartReview />

                {/* Sección de estadísticas */}
                <Box gridColumn="span 3" >
                <TotalUsers />
                <TotalProducts />
                {/* Aquí puedes agregar un componente para mostrar estadísticas */}
                </Box>

                {/* Sección de gráficos */}
                <Box gridColumn="span 8" >
                {/* Aquí puedes agregar gráficos */}
                <LastRegisteredUsers />
                
                </Box>

                {/* Otras secciones */}
                <Box gridColumn="span 4" >
                    
                {/* Aquí puedes agregar otra sección */}
                </Box>
                <Box gridColumn="span 4" >
                {/* Aquí puedes agregar otra sección */}
                </Box>
                <Box gridColumn="span 4" >
                {/* Aquí puedes agregar otra sección */}
                </Box>
            </Box>
            </Box>

        </AdminLayout>
    )
}