import { useAuth0 } from "@auth0/auth0-react"
import { useUserAuthentication } from '../../hooks/useUserAuthentication';
import * as React from 'react';
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Typography, AppBar, Toolbar, Menu, MenuItem, Button, Tooltip, Avatar, Hidden } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartShoppingIcon from '../../cartShooping/component/CartShoopingIcon';
import { SearchBar } from '../searchBar';
import { useGetIsActiveQuery } from "../../store/api/ecommerceUserApi";
import Swal from 'sweetalert2';
import styles from './NavBar.module.css';

const pages = ['Inicio', 'Productos', 'Carrito de Compras'];
const settings = ['Perfil', 'Panel Administrador', 'Salir'];

export const NavBar = () => {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();
    
    const { data: isActive, errorUser, isLoading, refetch } = useGetIsActiveQuery(user?.email, { skip: !isAuthenticated })
    console.log(user);
    console.log(user?.email);
    const userData  = useUserAuthentication(user, isAuthenticated);
 
    console.log(isActive)
    const [anchorNav, setAnchorNav] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);

    

    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    React.useEffect(() => {
        if (isAuthenticated && !isLoading && isActive === false) {
            Swal.fire({
                icon: 'error',
                title: '¡Cuenta bloqueada!',
                text: 'Por favor, contacte al soporte: ecommercetech2024@gmail.com',
                confirmButtonText: 'Cerrar',
                customClass: {
                    confirmButton: styles['swal-confirm-button']
                }
            }).then(() => {
                logout({ returnTo: window.location.origin });
            });
        }
    }, [isAuthenticated, isActive, isLoading, logout]);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
        
                
                <Link to="/">
                    <Box 
                        component="img"
                        alt="logo"
                        href="#app-bar-with-responsive-menu"
                        sx={{ 
                            mr: 2,
                            height: 80, 
                            width: 80, 
                            display: { xs: 'none', md: 'flex'}
                        }}
                        src="/logo.svg"
                    />
                </Link>
                  
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorNav}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            open={Boolean(anchorNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                              display: { xs: 'block', md: 'none', color: 'black' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <Link key={index} to={page === "Inicio" ? "/" : page === "Productos" ? "/products" : "/cartShopping"} style={{ textDecoration: 'none', color: "black" }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                          mr: 2,
                          display: { xs: 'flex', md: 'none' },
                          flexGrow: 1,
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link key={index} to={page === "Inicio" ? "/" : page === "Productos" ? "/products" : "/cartShopping"} style={{ textDecoration: 'none' }}>
                                {page === "Carrito de Compras" ?
                                    <CartShoppingIcon 
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'black', display: 'block', marginLeft: '16px' }}
                                    /> :
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 1.5, color: 'black', display: 'block', fontWeight: "bold"}}
                                    >
                                        {page}
                                    </Button>
                                }
                            </Link>
                        ))}
                    </Box>

                

                     {/* Insert the SearchBar component */}
                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <SearchBar />   
                    </Box>

                    <Box>
                        <Tooltip>
                            
                                {isAuthenticated ? (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography 
                                            variant="body1" 
                                            color={user.given_name === "User" ? "error" : "black"}
                                            sx={{ mr: 1, display: { xs: 'none', md: 'flex'} }}
                                            >
                                            {userData ? userData.nameUser : user.given_name}
                                            </Typography>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>                                                
                                                <Avatar alt={userData ? userData.nameUser : user.given_name} src={userData ? userData.pictureUser : user.picture} />
                                            </IconButton>                                            
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography 
                                                variant="body1" 
                                                color="black"
                                                sx={{ mr: 1, display: { xs: 'none', md: 'flex'} }}
                                            >
                                                Iniciar sesión
                                            </Typography>
                                            <IconButton 
                                                sx={{ p: 0 }}
                                                onClick={loginWithRedirect}
                                            >
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                            </IconButton>
                                        </Box>
                                    </>
                                )}
                            
                        </Tooltip>
                        {isAuthenticated ? (
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }} 
                                open={Boolean(anchorUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {(userData && userData.isAdmin ? ["Perfil", "Panel Administrador", "Salir"] : ["Perfil", "Salir"]).map((setting, index) => (
                                    <Link 
                                        key={index} 
                                        to={
                                            setting === "Perfil" ? "/user" 
                                            : setting === "Panel Administrador" ? "/admin" 
                                            : "/"
                                        } 
                                        style={{ textDecoration: 'none', color: "black" }}
                                    >
                                        <MenuItem 
                                            onClick={
                                                setting === "Salir" ? () => logout({ returnTo: '/' }) 
                                                : handleCloseUserMenu
                                            }
                                        >
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        ) : null}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}