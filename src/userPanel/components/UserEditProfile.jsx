import { useGetUserByTokenQuery } from './../../store/api/ecommerceUserApi'

import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { 
  Person as PersonIcon,
} from "@mui/icons-material";
import { usePutUpdateUserMutation } from './../../store/api/ecommerceUserApi'
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'

const TOKEN = localStorage.getItem('token');


const validationSchema = yup.object({
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
    .min(8, 'El DNI debe tener al menos 8 numeros')
    .max(8, 'El DNI debe tener como maximo 8 numeros'),

});

export const UserEditProfile = () => {

  const navigate = useNavigate();
  const { data: userData, isLoading: isLoadingDataUser } = useGetUserByTokenQuery(TOKEN, {
    refetchOnMountOrArgChange: true});
  const [updateUserMutation, { isSuccess, isError, error }] = usePutUpdateUserMutation();

  const fields = [
    { name: 'nameUser', label: 'Nombres', type: 'text', placeholder: 'Ingrese sus nombres' },
    { name: 'lastNameUser', label: 'Apellidos', type: 'text', placeholder: 'Ingrese sus apellidos' },
    { name: 'emailUser', label: 'Correo', type: 'email', placeholder: 'Ingrese su correo', disabled: true },
    { name: 'numberMobileUser', label: 'Telefono', type: 'number', placeholder: 'Ingrese su telefono' },
    { name: 'DNI', label: 'DNI', type: 'number', placeholder: 'Ingrese su DNI sin puntos' },
    { name: 'pictureUser', label: 'Foto de perfil', type: 'file' },
  ];

  const formik = useFormik({
    initialValues: {
      nameUser: isLoadingDataUser ? '' : userData.nameUser,
      lastNameUser: isLoadingDataUser ? '' : userData.lastNameUser,
      emailUser: isLoadingDataUser ? '' : userData.emailUser,
      numberMobileUser: isLoadingDataUser ? '' : userData.numberMobileUser,
      DNI: isLoadingDataUser ? '' : userData.DNI,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {     
      const { pictureUser, ...otherValues } = values;
      const formData = new FormData();
      Object.keys(otherValues).forEach(key => formData.append(key, otherValues[key]));
      if (pictureUser) {
        formData.append('pictureUser', pictureUser);
      }
      updateUserMutation({id:userData.idUser,...values})
        .unwrap()
        .then(response => {
          // console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){
            navigate('/user');
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

          <Grid container justifyContent="center" alignItems="center">
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
`                        <Avatar 
                          alt={userData ? userData.nameUser : 'Default Alt'}  
                          src={userData ? userData.pictureUser : 'Default Picture URL'} 
                          sx={{width: 56, height: 56}} 
                        />
                      </Grid>
                      
                      {fields.map((field, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          {field.type === 'file' ? (
                            <input
                              type="file"
                              name={field.name}
                              hidden
                              onChange={(event) => {
                                formik.setFieldValue(field.name, event.currentTarget.files[0]);
                              }}
                            />
                          ) : (
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
                          )}
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
 