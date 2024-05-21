import { useAuth0 } from "@auth0/auth0-react"
import { useUserAuthentication } from './../../hooks/useUserAuthentication';
import { Avatar, Box, Button, Grid, Typography } from "@mui/material"
import { Person as PersonIcon } from "@mui/icons-material"
import { Link } from "react-router-dom";



export const UserInfo = () => {

  const { user, isAuthenticated } = useAuth0();
  const userData = useUserAuthentication(user, isAuthenticated);

  return (
   <>
   {
      isAuthenticated && userData.tokenAuth.length > 10 && (
        <Grid 
          item 
          xs={6} 
          md={8}
          sx={{display: 'flex', justifyContent: 'left'}}
        >
          <Grid container>
            <Grid item xs={10} margin={2}>
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
                  <PersonIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
                  Mi perfil
                </div>
                <Link to="/user/editUser" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button variant="outlined">Editar perfil</Button>
                </Link>
              </Typography>
              <Grid container spacing={5} gap={5} sx={{mt:1}}>
                <Grid 
                  xs={6} 
                  sx={{
                    backgroundColor: '#fff', 
                    borderRadius:2,
                  }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        m: 3,
                        }}>
                      <Avatar alt={userData.nameUser}  src={userData.pictureUser} sx={{width: 40, height: 40}} />                                          
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
                        {userData.nameUser} {userData.lastNameUser}
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
                          pb: 2,
                          m: 4
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
                        {userData.nameUser}
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
                          m: 4
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
                        {userData.lastNameUser}
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
                          m: 4
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
                        {userData.emailUser}
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
                          m: 4,
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
                        Telefono
                        </Typography>                                          
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: 15, 
                            textAlign: 'left'
                          }}
                        >
                        {userData.numberMobileUser ? userData.numberMobileUser : 'No agregado'}
                        </Typography>                                                
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