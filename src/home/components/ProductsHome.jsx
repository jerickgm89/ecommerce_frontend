import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Card, CardContent, CardMedia, Box, Container, Paper, Button } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Rating from "@mui/material/Rating";

export const ProductsHome = ({ product, handleAddToCart, handleRemoveFromCart }) => {
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

    return ( 
        <Paper
            elevation={3}
            sx={{
                borderRadius: 5,
                padding:"10px",
                margin: 2,
                position: 'relative',
                overflow: 'hidden',
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
                <Link to={`${product.idProduct}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <img
                        src={product.imageProducts}
                        alt={product.nameProduct}
                        style={{ width: '100%', aspectRatio: '4/4', padding:"5px" }}
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
                minHeight: '150px'
                }}
            >
                <Box style={{ flex: 1 }}>
                    <Typography
                        gutterBottom
                        style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#373F50' }}
                    >
                        {product.nameProduct}
                    </Typography>
                    <Rating sx={{ mb: 1 }} />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography
                        gutterBottom
                        style={{ fontSize:"16px", marginBottom: '8px', fontWeight:600, color:"#D23F57" }}
                        >
                            ${product.priceProduct}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Paper>
    );
};