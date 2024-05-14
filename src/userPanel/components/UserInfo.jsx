import { Box, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { 
  ShoppingBag as ShoppingBagIcon,
  Place as PlaceIcon,
  Payment as PaymentIcon
} from "@mui/icons-material"
import { useAuth0 } from "@auth0/auth0-react"


export const UserInfo = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
   <>
    
    <Grid 
      item 
      xs={6} 
      md={8}
      sx={{display: 'flex', justifyContent: 'left'}}
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
          <Typography variant="h6">User</Typography>
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
            <ListItemText primary="Metodos de Pago" />
          </ListItemButton>
        </List>
      </Box>
    </Grid>
   </>
  )
}
