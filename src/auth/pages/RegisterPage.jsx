import { Link as RouterLink } from "react-router-dom"
import { Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Google } from "@mui/icons-material"
import { useFormik } from "formik"
import * as yup from 'yup'
import '../css'

const validationSchema = yup.object({
  dni: yup
    .number('Ingrese su DNI')
    .min(8, 'El DNI debe tener al menos 8 numeros')
    .required('El DNI es requerido'),
  name: yup
    .string('Ingrese su nombre')
    .required('El nombre es requerido'),
  lastName: yup
    .string('Ingrese su apellido')
    .required('El apellido es requerido'),
  email: yup
    .string('Ingrese su correo')
    .email('Ingrese un correo valido')
    .required('El correo es requerido'),
  password: yup
    .string('Ingrese su contraseña')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
});

export const RegisterPage = () => {

  const formik = useFormik({
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <AuthLayout title='Crear Cuenta'>
      <form >
          <Grid container>
            <Grid 
              item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField
                id="dni"
                name="dni"
                label="DNI" 
                type="number" 
                placeholder="Ingrese su DNI sin puntos" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.dni && Boolean(formik.errors.dni)}
                helperText={formik.touched.dni && formik.errors.dni}
              />
            </Grid>
            <Grid 
              item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField
                id="name"
                name="name"
                label="Nombres" 
                type="text" 
                placeholder="Jorge Erick" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid 
              item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField
                id="lastName"
                name="lastName"
                label="Apellidos" 
                type="text" 
                placeholder="Garcia Moron" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid 
              item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField
                id="email"
                name="email" 
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
            <Grid 
              item 
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid 
              item 
              xs={12}
              sx={{ mt: 2}}
            >
              <TextField 
                label="Repite tu contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
              />
            </Grid>
            <Grid 
              container 
              spacing={2} 
              sx={{ mb: 2, mt: 1}}
            >
              <Grid 
                item 
                xs={12} 
                sm={12}
              >
                <Button 
                  variant='contained' 
                  fullWidth
                  type="submit"
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid 
              container 
              direction={'row'} 
              justifyContent='center'
            >
              <Typography 
                sx={{ mr: 1}}
              >
                Al crear una cuenta, aceptas nuestros 
              </Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Terminos y Condiciones
              </Link>         
            </Grid>

            <Grid 
              container 
              direction={'row'} 
              justifyContent='end' 
              sx={{mt:2}}
            >
              <Typography sx={{ mr: 1,}}>
                ¿Ya tienes una cuenta?
              </Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresa
              </Link>              
            </Grid>
          </Grid>
        </form>
        <Divider variant="middle" sx={{mt:2}}>
          <Chip label="O" size="small" />
        </Divider>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1}}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth>
              <Google />
              <Typography>
                Continue con Google
              </Typography>
            </Button>
          </Grid>
        </Grid>
    </AuthLayout>
  )
}
