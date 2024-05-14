import * as React from 'react';
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Typography, AppBar, Toolbar, Menu, MenuItem, Button, Tooltip, Avatar, Hidden } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth0 } from "@auth0/auth0-react"

const pages = ['Inicio', 'Productos'];
const settings = ['Perfil', 'Mis pedidos', 'Salir'];

export const NavBar = () => {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();

    console.log(user);


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

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

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
                        src="/public/logo.svg"
                    />
                  
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
                                <Link key={index} to={page === "Inicio" ? "/" : page === "Productos" ? "/products" : "/chartShopping"} style={{ textDecoration: 'none', color: "black" }}>
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
                            <Link key={index} to={page === "Inicio" ? "/" : page === "Productos" ? "/products" : "/chartShopping"} style={{ textDecoration: 'none' }}>
                                {page === "Carrito de compras" ?
                                    <ShoppingCartIcon 
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
                                                {user.given_name}
                                            </Typography>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>                                                
                                                <Avatar alt={user.name} src={user.picture} />
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
                                {settings.map((setting, index) => (
                                    <Link 
                                        key={index} 
                                        to={setting === "Perfil" ? "/user" : "/"} 
                                        style={{ textDecoration: 'none', color: "black" }}
                                    >
                                        <MenuItem 
                                            onClick={
                                                setting === "Salir" ? () => logout({ returnTo: window.location.origin }) 
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