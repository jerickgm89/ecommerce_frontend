import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate, Link } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { 
  Place as PlaceIcon,
} from "@mui/icons-material";
import { usePutUpdateUserMutation } from '../../store/api/ecommerceUserApi'
import { useUserAuthentication } from "../../hooks/useUserAuthentication";
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'

const validationSchema = yup.object({
    identifierName: yup
      .string()
      .required('El nombre es requerido'),
    addressName: yup
      .string()
      .required('La direccion es requerida'),
    numberAddress: yup
      .string()
      .required('Numero de calle es requerido, poner 00 si no tiene numero de calle'),
    provinceAddress: yup
      .string()
      .required('La provincia es requerida'),
    cityAddress: yup
      .string()
      .required('La ciudad es requerida'),
  
});

export const UserAddAddress = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth0();
  const userData = useUserAuthentication(user, isAuthenticated);
  const [updateUserMutation, { isSuccess, isError, error }] = usePutUpdateUserMutation();

  const fields = [
    { name: 'identifierName', label: 'Nombre', type: 'text', placeholder: 'Tipo de direccion' },
    { name: 'addressName', label: 'Direccion', type: 'email', placeholder: 'Ingrese su correo'},
    { name: 'numberAddress', label: 'Numero de calle', type: 'number', placeholder: 'Ingrese sus apellidos' },
    { name: 'provinceAddress', label: 'Provincia', type: 'text', placeholder: 'Ingrese su telefono' },
    { name: 'cityAddress', label: 'Ciudad', type: 'text', placeholder: 'Ingrese su DNI sin puntos' },
  ];

  const formik = useFormik({
    initialValues: {
      identifierName: userData ? userData.identifierName : '',
      addressName: userData ? userData.addressName : '',
      numberAddress: userData ? userData.numberAddress : '',
      provinceAddress: userData ? userData.provinceAddress : '',
      cityAddress: userData ? userData.cityAddress : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {     
      updateUserMutation({id:userData.idUser,...values})
        .unwrap()
        .then(response => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){
            navigate('/user');
            window.location.reload();
          }, 2000);
        })
        .catch(error => {
          console.log(error)
        })
    },
    
  });

  return (
    <>
        <Grid 
          item 
          xs={12} 
          md={12}
          lg={8}
          sx={{display: 'flex', width: { xs: '100%'}}}
        >

          <Grid container>
            <Grid xs={10} marginBottom={4}>
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
                  Agregar Direccion
                </div>
                <Link to="/user/address" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button variant="outlined">Volver</Button>
                </Link>
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
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                     
                      {fields.map((field, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          <TextField 
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            fullWidth
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                            helperText={formik.touched[field.name] && formik.errors[field.name]}
                            disabled={field.disabled}
                          />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" disabled={!formik.dirty}>
                          Guardar cambios
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
            </Grid>
            </Grid>
    
          </Grid>
        </Grid>
    </>
  )
}
