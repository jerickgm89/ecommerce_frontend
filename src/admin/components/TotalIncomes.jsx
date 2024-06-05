import { useGetTotalRenevueQuery } from "../../store/api";
import { Typography, Paper, Box, Avatar } from '@mui/material';
import { MonetizationOn as MonetizationOnIcon } from '@mui/icons-material';

export const TotalIncomes = () => {
    const { data: totalRevenue, isLoading, isError } = useGetTotalRenevueQuery();

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al obtener los ingresos</p>;

    const total = totalRevenue?.totalRevenue || 0;

    const formattedTotal = (total) => {
        return new Intl.NumberFormat('es-ES', {}).format(parseFloat(total));
    };


    return (
        <Box mb={2}>
            <Paper elevation={3} style={{ backgroundColor:'#ff7043', padding: '16px', borderRadius:'30px', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: 'orange', marginRight: '16px' }}>
                    <MonetizationOnIcon style={{ color: '#2196f3' }}/>
                </Avatar>
                <Box>
                    <Typography variant="h6" color="textPrimary">Ingresos totales aprobados</Typography>
                    <Typography variant="subtitle1" color="textSecondary">$ {formattedTotal(total)}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};
