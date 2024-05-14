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
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          m: 4,
          p: 5,
          borderRadius: 4,
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <List component="div">
          
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
      </Box> */}
      <Grid container>
        <Grid item xs={12} margin={2}>
          <Typography 
            variant="h4" 
            sx={{          
              mt: 4,
              pb: 2,
              mb: 0,
              borderRadius: 4,
              display: 'flex', 
              justifyContent: 'left',
              fontWeight: 'bold',
            }}
            >
            Mi perfil
          </Typography>
          <Grid 
          sx={{backgroundColor: '#fff', p: 4, borderRadius: 4}}
          >
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Last Connection: {user.updated_at}</Typography>
            
          </Grid>
        </Grid>

      </Grid>
    </Grid>
   </>
  )
}