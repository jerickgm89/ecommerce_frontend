import { Typography, Box } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { Link } from 'react-router-dom';
import SentimentDissatisfiedSharpIcon from '@mui/icons-material/SentimentDissatisfiedSharp';

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
                    flexDirection: 'column' 
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SentimentDissatisfiedSharpIcon
                        sx={{
                            fontSize: '200px', 
                            color: 'black',
                            margin: 'auto' 
                        }}
                    />
                    <Typography variant="h1" sx={{color:"black"}}>404</Typography>
                    <Typography variant="h4">Page Not Found</Typography>
                </Box>
                <Link to="/" style={{textDecoration:'none', color: 'black'}}>
                    <Typography variant="">Ir a la pagina principal</Typography>
                </Link>
            </Box>
        </EcommerceUI>
    );
};
