import { EcommerceUI } from '../../ui';
import { RegretButton } from '../components/RegretButton';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';


export const RepetanceFormPage = () => {

    const Divider = styled('div')({
        width: '2px',
        height: '100%',
        backgroundColor: '#2e8fea', 
        margin: '0 20px', 
      });

    return (
        <EcommerceUI>
            <Box 
                sx={{ 
                    mt: 8, 
                    mb: 8, 
                    ml: 2, 
                    mr: 2, 
                    minHeight: '60vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
            <img src="./logo.svg" alt="" style={{width: '100px', height: '100px'}}/>
            <Typography variant='h4' gutterBottom>Solicitud de arrepentimiento</Typography>
            <Typography variant='body1' color='textSecondary'>¿Te arrepentiste de la compra? envíanos un mensaje y te responderemos lo antes posible.</Typography>
                <Grid container justifyContent="center" mt={2}>
                    <Grid item xs={12} sm={8} md={6}>
                        <RegretButton />
                    </Grid>
                </Grid>
                <Box mt={4} sx={{ justifyContent: "center", textAlign: "center", marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ justifyContent: "center",textAling:"center", mb:'15px'}}> Datos útiles</Typography>
                    <Grid container spacing={2} justifyContent="center">
                    <Paper elevation={3} sx={{ p: 2 , display:"flex", flexDirection:"row", borderRadius:"30px" }} >
                        <Grid item xs={12} sm={6} >
                                <Typography variant="body1" fontWeight="bold">Administración</Typography>
                                <Typography  sx={{fontSize:"0.8em"}}>0810-222-6245<br />Alberdi 532, Rosario, Pcia. de Santa Fe</Typography>
                        </Grid>
                        <Divider />
                        <Grid item xs={12} sm={6}>
                                <Typography variant="body1" fontWeight="bold">E-mail</Typography>
                                <Typography variant="body1" sx={{justifyContent:"center", textAling:"center"}}>
                                    <a href="mailto:ecommerceTech2024@gmail.com" style={{ textDecoration: 'none', color: '#007bff' }}>ecommerceTech2024@gmail.com</a>
                                </Typography>
                        </Grid>
                    </Paper>

                    </Grid>
                </Box>
            </Box>
        </EcommerceUI>
    );
    }