import { Link as RouterLink } from "react-router-dom"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { AuthLayout } from "../layout/AuthLayout"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useAuth0 } from "@auth0/auth0-react"
import '../css'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Ingrese un correo valido')
    .required('El correo es requerido'),
  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida') 
});

export const LoginPage = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { loginWithRedirect } = useAuth0();

  return (
    <AuthLayout title='Iniciar Sesión'>
      <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField 
                id='email'
                name='email'
                label="Correo" 
                type="email" 
                placeholder="correo@google.com" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField
                id="password"
                name="password"
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1}}>
              <Grid item xs={12} sm={6}>
                <Button variant='contained' fullWidth type="submit">
                  Ingresa
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant='contained' fullWidth onClick={() => loginWithRedirect()}>
                  <Google />
                  <Typography>
                        Google                    
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction={'row'} justifyContent='end'>
              <Typography sx={{ mr: 1}}>
                ¿No tienes una cuenta?
              </Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Registrarse
              </Link>              
            </Grid>
            
          </Grid>
        </form>
    </AuthLayout>
  )
}