import { useAuth0 } from "@auth0/auth0-react"
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { 
  Place as PlaceIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";


export const UserAddressList = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      {
        isAuthenticated && (
          <Grid 
            item 
            xs={6} 
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
                    <PlaceIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
                    Mis direcciones
                  </div>
                  <Button variant="outlined">Agregar direcciones</Button>
                </Typography>
                <Grid container spacing={1} sx={{mt:1}}>
                  <Grid 
                    xs={12} 
                    sx={{
                      backgroundColor: '#fff', 
                      borderRadius:2,
                      p: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Grid xs={2} sx={{backgroundColor: '#fff', borderRadius:2}}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%'
                          }}
                        >                                                            
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: 15, 
                              textAlign: 'left'
                            }}
                          >
                          Office
                          </Typography>                                                
                        </Box>
                      </Grid>

                      <Grid xs={5} sx={{backgroundColor: '#fff', borderRadius:2}}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%'
                          }}
                        >                                                            
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: 15, 
                              textAlign: 'left'
                            }}
                          >
                          Asoc. Villa Universitaria Mz c Lt 12
                          </Typography>                                                
                        </Box>
                      </Grid>
                      <Grid xs={3} sx={{backgroundColor: '#fff', borderRadius:2}}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%'
                          }}
                        >                                                            
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontSize: 15, 
                              textAlign: 'left'
                            }}
                          >
                          +54 385 5987654
                          </Typography>                                                
                        </Box>
                      </Grid>
                      <Grid xs={2} sx={{backgroundColor: '#fff', borderRadius:2}}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'right',
                            height: '100%'
                          }}
                        > 
                          <IconButton aria-label="edit" size="small" color="primary">
                            <EditIcon/>
                          </IconButton>
                          <IconButton aria-label="delete" size="small" color="primary">
                            <DeleteIcon/>
                          </IconButton>
                                                                        
                        </Box>
                      </Grid>
                    </Box>
                  </Grid>
              </Grid>
              </Grid>
      
            </Grid>
          </Grid>
        )
      }
    </>
  )
}
 