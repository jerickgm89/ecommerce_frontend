import { Box, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { 
  ShoppingBag as ShoppingBagIcon,
  Place as PlaceIcon,
  Payment as PaymentIcon
} from "@mui/icons-material"

export const SideBarUser = () => {
  return (
    <Grid 
      item 
      xs={6} 
      md={4}
      sx={{display: 'flex', justifyContent: 'right'}}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          m: 4,
          p: 5,
          borderRadius: 4,
          backgroundColor: '#fff'
        }}
      >
        <List component="div">
          <Typography variant="h6">Configuracion de Perfil</Typography>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText primary="Información personal" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Direcciones" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText priceMax="Metodos de Pago" />
          </ListItemButton>
        </List>
      </Box>
    </Grid>
  )
}