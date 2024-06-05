import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  InputBase, 
  Badge, 
  MenuItem, 
  Menu  
} from '@mui/material';
import { 
  AccountCircle, 
  Menu          as MenuIcon, 
  Mail          as MailIcon, 
  Notifications as NotificationsIcon, 
  MoreVert      as MoreIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useGetDeactivedReviewsQuery } from '../../store/api/ecommerceReviewApi';
import { useGetQuestionsQuery } from '../../store/api/ecommerceQuestionsApi';
import { setReviewsCount, setUnansweredCount } from '../../store/adminNotifications/notificationsSlice';

export const NavbarAdmin = ({drawerWith, handleDrawerToggle}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const notifications = useSelector((state) => state.notifications);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { data: reviews = [], error, isLoading, refetch } = useGetDeactivedReviewsQuery()
    const { data: questions = [], errorQuestions, isLoadingQuestions, refetchQuestions } = useGetQuestionsQuery()
    const dispatch = useDispatch()

    useEffect(() => {
      const count = reviews.length;
      const unansweredCount = questions.filter(question => !question.responseComments).length;
      dispatch(setReviewsCount(count));
      dispatch(setUnansweredCount(unansweredCount));
      refetch()
    }, [reviews, questions])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
          <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
            <MenuItem onClick={handleMenuClose}>Salir del Administrador</MenuItem>
          </Link>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
              <IconButton 
                size="large" 
                aria-label="show 4 new mails" 
                color="inherit">
                <Badge badgeContent={notifications?.unansweredCount} color="error">
                    <MailIcon />
                </Badge>
              </IconButton>
              <p>Mensajes</p>
          </MenuItem>

          <MenuItem>
              <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              >
              <Badge badgeContent={notifications?.reviewsCount} color="error">
                  <NotificationsIcon />
              </Badge>
              </IconButton>
              <p>Notificaciones</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              >
              <AccountCircle />
              </IconButton>
              <p>Perfil</p>
          </MenuItem>
        </Menu>
    );

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar 
        position="fixed"
        sx={{ 
            width: { sm: `calc(100% - ${drawerWith}px)` },
            ml: { sm: `${drawerWith}px` },
            backgroundColor: '#2064a3',
        }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton size="large" aria-label={`show ${notifications.unansweredCount} new mails`} color="inherit">
            <Badge badgeContent={notifications.unansweredCount} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label={`show ${notifications.reviewsCount} new notifications`}
            color="inherit"
          >
            <Badge badgeContent={notifications.reviewsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
  </Box>
  )
}