import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi";
import { useDeleteAddressMutation } from "../../store/api/ecommerceAddressApi";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Place as PlaceIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const TOKEN = localStorage.getItem('token');

export const UserAddressList = () => {
  const { data: userData, isLoading } = useGetUserByTokenQuery(TOKEN);
  console.log(userData);
  const [deleteAddress] = useDeleteAddressMutation();

  if (isLoading) return null;

  return (
    <Grid 
      item xs={12} md={12} lg={8} sx={{display: 'flex', width: { xs: '100%'}}}>
      <Grid container>
        <Grid xs={12} margin={4}>
          <Typography variant="h4" sx={{mt: 4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', fontWeight: 'bold'}}>
            <div>
              <PlaceIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
              Mis direcciones
            </div>
            <Link to="/user/addAddress" style={{ textDecoration: 'none', color: 'inherit', width: { xs: '100%', sm: 'auto' } }}>
              <Button variant="outlined" fullWidth={{ xs: true, sm: false }}>Agregar direcciones</Button>
            </Link>
          </Typography>
          {userData.entityUserAddresses.map((address, index) => (
            <Grid container spacing={1} sx={{mt:1}} key={index} justifyContent="center" alignItems="center">
              <Grid xs={12} sx={{backgroundColor: '#fff', borderRadius:2, p: 3}}>
                <Box sx={{display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center'}}>
                  <GridItem xs={12} sm={2} text={address.identifierName} sx={{textAlign: { xs: 'center', sm: 'left' }}} />
                  <GridItem xs={12} sm={5} text={`${address.addressName} ${address.numberAddress}`} sx={{textAlign: { xs: 'center', sm: 'left' }}} />
                  <GridItem xs={12} sm={3} text={address.provinceAddress} sx={{textAlign: { xs: 'center', sm: 'left' }}} />
                  <GridItem xs={12} sm={3} text={address.cityAddress} sx={{textAlign: { xs: 'center', sm: 'left' }}} />
                  <GridItem xs={12} sm={3} text={`C.P.: ${address.postalCode}`} sx={{textAlign: { xs: 'center', sm: 'left' }}} />
                  <Grid xs={12} sm={1} sx={{backgroundColor: '#fff', borderRadius:2}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}>
                      <IconButton aria-label="delete" size="small" color="primary" onClick={() => {
                        Swal.fire({
                          title: '¿Estás seguro?',
                          text: "No podrás revertir esto!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Sí, bórralo!'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteAddress(address.idUserAddress);
                            Swal.fire(
                              'Eliminado!',
                              'La dirección ha sido eliminada.',
                              'success'
                            )
                            window.location.reload(); // Recargar la página
                          }
                        })
                      }}>
              <DeleteIcon/>
            </IconButton>
          </Box>
        </Grid>
      </Box>
    </Grid>
  </Grid>
))}
        </Grid>
      </Grid>
    </Grid>
  )
}

const GridItem = ({ xs, text }) => (
  <Grid xs={xs} sx={{backgroundColor: '#fff', borderRadius:2}}>
    <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <Typography variant="body1" sx={{fontSize: 15, textAlign: 'left'}}>{text}</Typography>
    </Box>
  </Grid>
);