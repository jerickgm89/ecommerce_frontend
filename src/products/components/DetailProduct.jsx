
import { Typography, Box, Grid, Paper, Button } from '@mui/material';

const DetailProduct = ({ product }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={product.image} alt={product.name} style={{ width: '100%' }} />
         
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>{product.name}</Typography>
          {/* <Typography variant="body1" gutterBottom><strong>Brand:</strong> {product.brand}</Typography> */}
          {/* <Typography variant="body1" gutterBottom><strong>Rated:</strong> {product.rated}</Typography> */}
          {/* <Typography variant="body1" gutterBottom><strong>Option:</strong> {product.option}</Typography> */}
          {/* <Typography variant="body1" gutterBottom><strong>Type:</strong> {product.type}</Typography> */}
          <Typography variant="body1" gutterBottom><strong>Price:</strong> ${product.price}</Typography>
          {/* <Typography variant="body1" gutterBottom><strong>Stock:</strong> {product.stock}</Typography> */}
          <Typography variant="body1" gutterBottom><strong>Description:</strong> {product.description}</Typography>
          {/* <Typography variant="body1" gutterBottom><strong>Review:</strong> {product.review}</Typography> */}
          
          <Box mt={2}>
            <Button variant="contained" color="primary">Add to Cart</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailProduct;
