import { Link } from "react-router-dom"
import { Box, colors, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { 
  ShoppingBagOutlined as ShoppingBagIcon,
  FavoriteBorderOutlined as FavoriteIcon,
  SupportAgentOutlined as SupportIcon,
  Place as PlaceIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
} from "@mui/icons-material"

export const SideBarUser = () => {
  return (
    <Grid 
      item 
      xs={12} 
      md={4}
      sx={{display: 'flex', justifyContent: 'right', alignItems: 'flex-start'}}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          m: 4,
          p: 5,
          borderRadius: 4,
          backgroundColor: '#fff',
          width: { xs: '100%'}
        }}

      >
        <List component="div">
          <Typography variant="h6">DashBoard</Typography>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText primary="Ordenes" />
          </ListItemButton>

          <Link 
            to="/user/wishlist" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Lista de deseos" />
            </ListItemButton>

          </Link>

          {/* <ListItemButton>
            <ListItemIcon>
              <SupportIcon />
            </ListItemIcon>
            <ListItemText primary="Soporte" />
          </ListItemButton> */}
        </List>
        <List component="div">
          <Typography variant="h6">Configuracion de Perfil</Typography>
          <Link
            to="/user" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Información personal" textDecoration="none"/>
            </ListItemButton>
          </Link>

          <Link 
            to="/user/address" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Direcciones" />
            </ListItemButton>
          </Link>

          <ListItemButton>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Metodos de Pago" />
          </ListItemButton>
        </List>
      </Box>
    </Grid>
  )
}