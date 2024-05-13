import { useState } from 'react';
import { Typography, Box, Grid, Paper, Button, Container, Tab, Tabs } from '@mui/material';


const DetailProduct = ({ product }) => {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.priceProduct);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={product.imageProducts} alt={product.nameProduct} style={{ width: '100%' }} />
         
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px', color: '#373F50' }}>{product.nameProduct}</Typography>
          <Typography gutterBottom style={{ fontSize: '25px', fontWeight: 700, marginBottom: '8px', color: 'rgb(210, 63, 87)' }}>${formattedPrice}</Typography>
          <Typography variant="body1" gutterBottom><strong>Description:</strong> {product.description}</Typography>
          
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
        </Grid>

        <Box sx={{ width: '100%' }}>
          <Box sx={{  borderBottom: 1 , borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              aria-label="Description and Review tabs"
              indicatorColor="secondary" 
              textColor="secondary"
            >

              <Tab label="Description" sx={{textTransform:'none'}} />
              <Tab label="Review" sx={{textTransform:'none'}}/>
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <Box p={3}>
              <Typography variant="body1" gutterBottom><strong>Description:</strong> {product.description}</Typography>
            </Box>
          )}
          {tabValue === 1 && (
            <Box p={3}>
              <Typography variant="body1" gutterBottom><strong>Review:</strong> {product.review}</Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default DetailProduct;
