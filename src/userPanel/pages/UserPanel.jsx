import { Box, Grid, Typography } from "@mui/material"
import { UserLayout } from "../layout/"

export const UserPanel = () => {
  return (
    <UserLayout>
      <Grid container spacing={2}>
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{display: 'flex', justifyContent: 'center'}}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              m: 2,
              p: 5,
              borderRadius: 4,
              backgroundColor: '#fff'
            }}
          >
            <Box>
              <Typography variant="h6">Configuracion de Perfil</Typography>
              <Box sx={{diplay: 'flex', alignItems:'left', m:2}}>
                
                <Typography variant="body1">Juan Perez</Typography>
              </Box>
            </Box>
            <p>En esta sección podrás ver y editar tu información personal.</p>
          </Box>
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={6}
          sx={{display: 'flex', justifyContent: 'center'}}
        >
          <h2>Información del usuario</h2>
        </Grid>
      </Grid>
    </UserLayout>
  )
}
