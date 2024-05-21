import { useEffect, useState } from 'react';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Typography } from '@mui/material';
import ProductCard from './../../products/components/ProductCard';
import { removeFavorite, updateFavorites } from './../../products/utils/localStorage/favorites';
import { Link } from 'react-router-dom';


export const UserWishList = () => {
    const [favorites, setFavorites] = useState([]);
    const [favoritesChanged, setFavoritesChanged] = useState(false);

    useEffect(() => {
        const updatedFavorites = updateFavorites();
        setFavorites(updatedFavorites);
    }, [favoritesChanged]);

    const handleRemoveFavorite = (product) => {
        removeFavorite(productToRemove);
        const updatedFavorites = updateFavorites();
        setFavorites(updatedFavorites);
        setFavoritesChanged(!favoritesChanged);
        window.location.reload();
    };
    
    const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
        {
            isAuthenticated && (
                <Grid 
                    item 
                    xs={12} 
                    md={8}
                    sx={{display: 'flex', justifyContent: 'left'}}
                >
                    <Grid container>    
                        <Grid xs={10} margin={2}>
                            <Typography 
                            variant="h4" 
                            sx={{          
                                mt: 4,
                                pb: 2,
                                mb: 0,
                                borderRadius: 4,
                                display: 'flex', 
                                justifyContent: 'space-between',
                                fontWeight: 'bold',
                            }}
                            >
                            <div>
                                <FavoriteIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
                                Mi lista de deseos
                            </div>
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} margin={3} >
                            {favorites.length > 0 ? (
                                    favorites.map((product) => (
                                        <Grid item xs={6} sm={6} md={4} key={product.idProduct}>
                                            <ProductCard product={product} handleRemoveFavorite={() => handleOpenDialog(product)}/>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="h4" align="center" color="textSecondary">
                                        No tienes favoritos,
                                        <Link to="/products" style={{
                                            color: 'grey',
                                            textDecoration: 'none',
                                            ml: 1,
                                            fontWeight: 'bold'
                                        }}>ver productos</Link>
                                    </Typography>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
    </>
  )
}
 