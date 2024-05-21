import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { 
  Person as PersonIcon,
} from "@mui/icons-material";
import { usePutUpdateUserMutation } from './../../store/api/ecommerceUserApi'
import { useUserAuthentication } from "../../hooks/useUserAuthentication";
import { useFormik } from "formik"
import * as yup from 'yup'
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  id: yup
    .number(),
  nameUser: yup
    .string()
    .required('El nombre es requerido'),
  lastNameUser: yup
    .string()
    .required('El apellido es requerido'),
  emailUser: yup
    .string()
    .email('Ingrese un correo valido')
    .required('El correo es requerido'),
  numberMobileUser: yup
    .string()
    .matches(/^[0-9]+$/, 'El telefono debe ser un numero')
    .required('El telefono es requerido'),
  DNI: yup.string()
    .matches(/^[0-9]+$/, 'El DNI debe ser un numero')
    .min(5, 'El DNI debe tener al menos 8 numeros')
    .max(8, 'El DNI debe tener como maximo 8 numeros'),

});

export const UserEditProfile = () => {
  const { user, isAuthenticated } = useAuth0();
  const userData = useUserAuthentication(user, isAuthenticated);
  const [updateUserMutation] = usePutUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      idUser: userData.idUser,
      nameUser: userData.nameUser,
      lastNameUser: userData.lastNameUser,
      emailUser: userData.emailUser,
      numberMobileUser: userData.numberMobileUser,
      DNI: userData.DNI,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {      
      updateUserMutation(values);
    },
  });

  return (
    <>
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
                  <PersonIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
                  Editar Perfil
                </div>
                <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      <Grid item xs={12}>
                      <Avatar alt={userData.nameUser}  src={userData.pictureUser} sx={{width: 56, height: 56}} />
                      </Grid>
                      <Grid item xs={6} hidden>
                        <TextField 
                          name="idUser"
                          label="Id"
                          type="text"
                          placeholder="Ingrese su id"
                          fullWidth
                          value={formik.values.idUser}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.idUser && Boolean(formik.errors.idUser)}
                          helperText={formik.touched.idUser && formik.errors.idUser}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField 
                          name="nameUser"
                          label="Nombres"
                          type="text"
                          placeholder="Ingrese sus nombres"
                          fullWidth
                          value={formik.values.nameUser}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.nameUser && Boolean(formik.errors.nameUser)}
                          helperText={formik.touched.nameUser && formik.errors.nameUser}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField 
                          name="lastNameUser"
                          label="Apellidos"
                          type="text"
                          placeholder="Ingrese sus apellidos"
                          fullWidth
                          value={formik.values.lastNameUser}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.lastNameUser && Boolean(formik.errors.lastNameUser)}
                          helperText={formik.touched.lastNameUser && formik.errors.lastNameUser}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField 
                          name="emailUser"
                          label="Correo"
                          type="email"
                          placeholder="Ingrese su correo"
                          fullWidth
                          value={formik.values.emailUser}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.emailUser && Boolean(formik.errors.emailUser)}
                          helperText={formik.touched.emailUser && formik.errors.emailUser}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField 
                          name="numberMobileUser"
                          label="Telefono"
                          type="text"
                          placeholder="Ingrese su telefono"
                          fullWidth
                          value={formik.values.numberMobileUser}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.numberMobileUser && Boolean(formik.errors.numberMobileUser)}
                          helperText={formik.touched.numberMobileUser && formik.errors.numberMobileUser}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name="DNI"
                          label="DNI" 
                          type="text" 
                          placeholder="Ingrese su DNI sin puntos" 
                          fullWidth
                          value={formik.values.DNI}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.DNI && Boolean(formik.errors.DNI)}
                          helperText={formik.touched.DNI && formik.errors.DNI}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
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
 