import { Avatar, Box, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"

import { useAuth0 } from "@auth0/auth0-react"
import { RoundedCorner } from "@mui/icons-material";


export const UserInfo = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  return (
   <>
    
    <Grid 
      item 
      xs={6} 
      md={8}
      sx={{display: 'flex', justifyContent: 'left'}}
    >
      <Grid container>
        <Grid xs={12} margin={2}>
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
          {/* <Grid 
          sx={{backgroundColor: '#fff', p: 4, borderRadius: 4}}
          >
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Last Connection: {user.updated_at}</Typography>
          </Grid> */}
          <Grid container spacing={2} gap={2} sx={{mt:1}}>
            <Grid item xs={7} sx={{backgroundColor: '#fff', borderRadius:2}}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 2,
                    }}>
                  <Avatar alt={user.given_name}  src={user.picture} sx={{width: 50}} />                                          
                  <Typography 
                  variant="body1" 
                  sx={{ 
                    ml: 1, 
                    display: { 
                      xs: 'none', 
                      md: 'flex'
                    }, 
                    fontSize: 18
                  }}
                  >
                  {user.name}
                  </Typography>                                                
                </Box>
            </Grid>
            <Grid xs={1} sx={{backgroundColor: '#fff', borderRadius:2}}>
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%'
                  }}
                >
                  <Typography 
                    sx={{
                      textAlign: 'center', 
                      color: 'primary.main',
                      fontSize: 22,
                    }}
                  >
                  16
                  </Typography>                                          
                  <Typography 
                    variant="body1" 
                    sx={{ fontSize: 12, textAlign: 'center'}}
                  >
                  Ordenes
                  </Typography>                                                
                </Box>
            </Grid>
            <Grid xs={1} sx={{backgroundColor: '#fff', borderRadius:2}}>
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%'
                  }}
                >
                  <Typography 
                    sx={{
                      textAlign: 'center', 
                      color: 'primary.main',
                      fontSize: 22,
                    }}
                  >
                  02
                  </Typography>                                          
                  <Typography 
                    variant="body1" 
                    sx={{ fontSize: 12, textAlign: 'center'}}
                  >
                  Por pagar
                  </Typography>                                                
                </Box>
            </Grid>
            <Grid xs={1} sx={{backgroundColor: '#fff', borderRadius:2}}>
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%'
                  }}
                >
                  <Typography 
                    sx={{
                      textAlign: 'center', 
                      color: 'primary.main',
                      fontSize: 22,
                    }}
                  >
                  00
                  </Typography>                                          
                  <Typography 
                    variant="body1" 
                    sx={{ fontSize: 12, textAlign: 'center'}}
                  >
                  Por enviar
                  </Typography>                                                
                </Box>
            </Grid>
            <Grid xs={1} sx={{backgroundColor: '#fff', borderRadius:2}}>
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%'
                  }}
                >
                  <Typography 
                    sx={{
                      textAlign: 'center', 
                      color: 'primary.main',
                      fontSize: 22,
                    }}
                  >
                  01
                  </Typography>                                          
                  <Typography 
                    variant="body1" 
                    sx={{ fontSize: 12, textAlign: 'center'}}
                  >
                  Por enviar
                  </Typography>                                                
                </Box>
            </Grid>
            <Grid 
              item
              xs={12} 
              sx={{
                  backgroundColor: '#fff',
                  borderRadius: 2,}}>
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
                      flexDirection: 'column', 
                      alignItems: 'left',
                      height: '100%',
                      pb:2
                    }}
                  >
                    <Typography 
                      sx={{
                        textAlign: 'left', 
                        color: 'primary.main',
                        fontSize: 12,
                      }}
                    >
                    Nombres
                    </Typography>                                          
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: 15, 
                        textAlign: 'left'
                      }}
                    >
                    {user.given_name}
                    </Typography>                                                
                  </Box>
                </Grid>
                <Grid xs={2} sx={{backgroundColor: '#fff', borderRadius:2}}>
                  <Box
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'left',
                      height: '100%',
                      pb:2
                    }}
                  >
                    <Typography 
                      sx={{
                        textAlign: 'left', 
                        color: 'primary.main',
                        fontSize: 12,
                      }}
                    >
                    Apellidos
                    </Typography>                                          
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: 15, 
                        textAlign: 'left'
                      }}
                    >
                    {user.family_name}
                    </Typography>                                                
                  </Box>
                </Grid>
                <Grid xs={2} sx={{backgroundColor: '#fff', borderRadius:2}}>
                  <Box
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'left',
                      height: '100%',
                      pb:2
                    }}
                  >
                    <Typography 
                      sx={{
                        textAlign: 'left', 
                        color: 'primary.main',
                        fontSize: 12,
                      }}
                    >
                    Email
                    </Typography>                                          
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: 15, 
                        textAlign: 'left'
                      }}
                    >
                    {user.email}
                    </Typography>                                                
                  </Box>
                </Grid>
                <Grid xs={2} sx={{backgroundColor: '#fff', borderRadius:2}}>
                  <Box
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'left',
                      height: '100%',
                      pb:2,
                      pr:2
                    }}
                  >
                    <Typography 
                      sx={{
                        textAlign: 'left', 
                        color: 'primary.main',
                        fontSize: 12,
                      }}
                    >
                    Ultima conexion
                    </Typography>                                          
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: 15, 
                        textAlign: 'left'
                      }}
                    >
                    {new Date(user.updated_at).toLocaleTimeString()}
                    </Typography>                                                
                  </Box>
                </Grid>
                
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
   </>
  )
}