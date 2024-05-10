import * as React from 'react';
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Typography, AppBar, Toolbar, Menu, MenuItem, Button, Tooltip, Avatar } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth0 } from "@auth0/auth0-react"

const pages = ['Inicio', 'Productos', 'Carrito de Compras'];
const settings = ['Perfil', 'Mis pedidos', 'Salir'];

export const NavBar = () => {
    const { loginWithRedirect } = useAuth0();


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

                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "black" }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

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
                                <Link key={index} to={page === "Home" ? "/" : page === "Products" ? "/products" : "/chartShopping"} style={{ textDecoration: 'none', color: "black" }}>
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
                            <Link key={index} to={page === "Home" ? "/" : page === "Products" ? "/products" : "/chartShopping"} style={{ textDecoration: 'none' }}>
                                {page === "Chart Shopping" ?
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
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
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
                                    to={setting === "Perfil" ? "#" : "/"} 
                                    style={{ textDecoration: 'none', color: "black" }}
                                >
                                    <MenuItem onClick={setting === "Perfil" ? loginWithRedirect : handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}