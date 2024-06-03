import { Typography, Box, Button } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { Link } from 'react-router-dom';
import nofound from "../assets/nofound.png";

export const NotFoundPage = () => {
    console.log("NotFoundPage");
    return (
        <EcommerceUI>
            <Box 
                sx={{ 
                    mt: 8, 
                    mb: 8, 
                    ml: 8, 
                    mr: 8, 
                    textAlign: 'center',
                    justifyContent: 'center',
                    minHeight: '55vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center'  
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={nofound} alt="404" style={{ width: '50%' }} />
                    <Typography variant="h5" sx={{ mt: 2 }}>Ups, parece que hubo un error</Typography>
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>La página que buscas no existe</Typography>
                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" component={Link} to="/" sx={{ fontSize: '1rem', padding: '10px 20px' }}>
                        Volver al inicio
                    </Button>
                </Box>
            </Box>
        </EcommerceUI>
    );
};
