
import { Typography, Paper, Box, Button, CardContent} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import Rating from "@mui/material/Rating";
import { Link } from 'react-router-dom'

const ProductCard = ({ product, handleAddToCart, handleRemoveFromCart }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <Link to={`/products/details/${product.id}`} style={{ textDecoration: 'none' }}>
        <img 
          src={product.image}
          alt={product.name}
          style={{ width: '100%', aspectRatio: '4/3'}} 
        />
      </Link>
      
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', minHeight: '150px' }}>
        <Box style={{ flex: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}>
            {product.name}
          </Typography>
          <Rating sx={{ mb: 1 }} /> 
          
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body1" gutterBottom color="#D23F57" fontWeight="600" fontSize="14px" style={{ marginBottom: '8px' }}> 
              ${product.price}
            </Typography>
            <Box display="flex" alignItems="center">
              {product.quantity > 0 && (
                <Box display="flex" alignItems="center">
                  <Button
                    onClick={() => handleRemoveFromCart(product.id)}
                    startIcon={<IndeterminateCheckBoxOutlinedIcon style={{ color: '#D23F57' }}/>}
                    size="large"
                    sx={{ minWidth: 'auto'}}
                  />
                  <Typography style={{ fontSize: "14px", color: "rgb(43, 52, 69)" }}>
                    {product.quantity}
                  </Typography>
                </Box>
              )}
              <Button
                onClick={() => handleAddToCart(product.id)}
                startIcon={<AddBoxOutlinedIcon style={{ color: '#D23F57' }} />}
                size="large"
                sx={{ minWidth: 'auto' }} 
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  );
};

export default ProductCard;
