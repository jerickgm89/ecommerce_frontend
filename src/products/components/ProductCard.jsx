import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Paper, Box, Button, CardContent, Modal } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Rating from "@mui/material/Rating";
import { useGetCategoriesQuery } from '../../store/api';

const ProductCard = ({ product, handleAddToCart, handleRemoveFromCart }) => {

  const { data: categories } = useGetCategoriesQuery();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (categories) {
      const foundCategory = categories.find(cat => cat.idCategory === product.idCategory);
      setCategory(foundCategory);
    }
  }, [categories, product]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleMouseEnter = () => {
    setShowIcons(true);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };
  
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(product.priceProduct);

  function shortenProductName(name, maxLength) {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    } else {
      return name;
    }
  }

  return (
        <Paper
          elevation={1}
          sx={{
            borderRadius: '8px',
            boxShadow:"rgba(1, 0, 71, 0.3) 0px 1px 3px",
            padding:"10px",
            position: 'relative',
            overflow: 'hidden',
            height: 'auto',
            '&:hover .icon-container': {
              visibility: 'visible'
            }
          }}
        >
          <Box
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/products/details/${product.idProduct}`} style={{ textDecoration: 'none', display: 'block' }}>
              <img
                src={product.imageProducts}
                alt={product.nameProduct}
                style={{ width: '100%', aspectRatio: '4/4'}}
              />
            </Link>
            <Box
              style={{
                position: 'absolute',
                top: '20%',
                right: 0,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 1,
                visibility: showIcons ? 'visible' : 'hidden'
              }}
            >
              <Button onClick={handleToggleModal} sx={{ minWidth: 'auto' }}>
                <RemoveRedEyeOutlinedIcon style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize:"1.25rem" }}/>
              </Button>
              <Button onClick={handleToggleFavorite} sx={{ minWidth: 'auto' }}>
                {isFavorite ? <FavoriteIcon style={{ color: 'rgb(210, 63, 87)'}} /> : <FavoriteBorderIcon style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize:"1.25rem"}} />}
              </Button>
            </Box>
          </Box>

          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              minHeight: '150px',
              height: 'calc(100% - 200px)',
            }}
          >
            <Box style={{ flex: 1 }}>

              <Typography
                gutterBottom
                style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
                title={product.nameProduct}
              >
                {shortenProductName(product.nameProduct, 15)}
              </Typography>
              
              <Typography
                gutterBottom
                style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
              >
                {product.stockProduct > 0 ? 'In Stock' : 'Out of Stock'}
              </Typography>

              <Rating sx={{ mb: 1 }} />

              <Box display="flex" alignItems="center" justifyContent="space-between">

                <Box>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize:"18px", marginBottom: '8px', fontWeight:600, color:"#D23F57" }}
                >
                  $ {formattedPrice}
                </Typography>
                </Box>

                <Box display="flex"  alignItems="center">
                  {product.quantity > 0 && ( 
                    <Box display="flex" alignItems="center">
                      
                      <Button
                        onClick={() => handleRemoveFromCart(product.idProduct)}
                        startIcon={<RemoveShoppingCartIcon style={{ color: '#D23F57'}} />}
                        size="large"
                        sx={{ minWidth: 'auto'}}
                      />
                      <Typography style={{ fontSize: "14px", color: "rgb(43, 52, 69)" }}>
                        {product.quantity}
                      </Typography>
                    </Box>
                  )}

                  <Button
                    onClick={() => handleAddToCart(product.idProduct)}
                    startIcon={<AddShoppingCartIcon />}
                    size="large"
                    sx={{ minWidth: 'auto', padding: '12px 5px', color: '#D23F57'}}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>

          <Modal open={modalOpen} onClose={handleToggleModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "450px",
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Button 
                onClick={handleToggleModal}
                sx={{ 
                  color:"rgb(15, 52, 96)", 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                }}
              >
                <CloseIcon/>
              </Button>

              <Typography style={{ fontSize: '30px', fontWeight: 700, marginBottom: '8px', color: '#373F50' }}>
                {product.nameProduct}
              </Typography>

              <Typography style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'rgb(174, 180, 190)' }}>
                CATEGORY: {category?.nameCategory}
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}
              >
                <img
                  src={product.imageProducts}
                  alt={product.nameProduct}
                  style={{ width: '75%', aspectRatio: '4/4' }}
                />
              </Box>

              <Typography style={{ fontSize: '15px', marginBottom: '8px', color: '#373F50' }}>
                {product.description}
              </Typography>

              <Typography style={{ fontSize: '25px', fontWeight: 700, marginBottom: '8px', color: 'rgb(210, 63, 87)' }}>
                $ {formattedPrice}
              </Typography>

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
                onClick={() => { handleAddToCart(product.idProduct); handleToggleModal(); }}
              >
                Add to Cart
              </Button>
            </Box>
          </Modal>
          
        </Paper>
  );
};

export default ProductCard;