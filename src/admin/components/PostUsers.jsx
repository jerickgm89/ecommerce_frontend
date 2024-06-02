import { useNavigate, Link } from 'react-router-dom'
import { Button, Grid, TextField, Typography } from "@mui/material"
import { usePostCreateUserMutation } from '../../store/api/ecommerceUserApi'
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

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
    DNI: yup
        .string()
        .matches(/^[0-9]+$/, 'El DNI debe ser un numero')
        .min(8, 'El DNI debe tener al menos 8 numeros')
        .max(8, 'El DNI debe tener como maximo 8 numeros'),
    pictureUser: yup
        .object()
        .shape({
            file: yup.mixed().required('Se requiere una imagen')
        })
        .required('Se requiere una imagen'),
  })

export const PostUsers = () => {
    const [postUser] = usePostCreateUserMutation()
    const navigate = useNavigate()

    const fields = [
        { name: 'nameUser', label: 'Nombres', type: 'text', placeholder: 'Ingrese sus nombres' },
        { name: 'lastNameUser', label: 'Apellidos', type: 'text', placeholder: 'Ingrese sus apellidos' },
        { name: 'emailUser', label: 'Correo', type: 'email', placeholder: 'Ingrese su correo electronico' },
        { name: 'numberMobileUser', label: 'Telefono', type: 'number', placeholder: 'Ingrese su telefono' },
        { name: 'DNI', label: 'DNI', type: 'number', placeholder: 'Ingrese su DNI sin puntos' },
    ]

    const formik = useFormik({
        initialValues: {
            nameUser: '',
            lastNameUser: '',
            emailUser: '',
            numberMobileUser: '',
            DNI: '',
            pictureUser: { file: null },
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {    
            const formData = new FormData()
            formData.append('email', values.emailUser)
            formData.append('given_name', values.nameUser)
            formData.append('family_name', values.lastNameUser)
            formData.append('email_verified', true)
            formData.append('pictureUser', values.pictureUser.file)
            postUser(formData)
                .unwrap()
                .then(response => {
                    console.log(response)
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario creado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(function(){
                        navigate('/admin/users');
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log(error)
                })
        },
    })

    return (
        <Grid
            container 
            justifyContent="center" 
            alignItems="center"
            style={{ minHeight: '70vh' }}
        >
            <Grid
                item 
                xs={12} 
                md={8}
                lg={6}
                sx={{display: 'flex'}}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} marginBottom={4}>

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
                                <PersonAddIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
                                Crear Usuario
                            </div>
                            <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit', marginRight: '25px' }}>
                                <Button variant="outlined">Volver</Button>
                            </Link>
                        </Typography>

                        <Grid container spacing={3} sx={{mt:1}}>
                            <Grid
                                item xs={12}
                                sx={{
                                    backgroundColor: '#fff', 
                                    borderRadius:2,
                                    p: 3,                
                                }}
                            >
                                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <Grid container spacing={2}>

                                        {fields.map((field, index) => (
                                            <Grid item xs={12} sm={6} key={index}>
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
                                                />
                                            </Grid>
                                        ))}

                                        <Grid item xs={12}>
                                            <input
                                                accept="image/*"
                                                id="contained-button-file"
                                                name="pictureUser"
                                                type="file"
                                                onChange={(event) => {
                                                    formik.setFieldValue("pictureUser", { file: event.currentTarget.files[0] });
                                                }}
                                                onBlur={formik.handleBlur}
                                                style={{ display: "none" }}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" component="span" fullWidth>
                                                    Cargar imagen
                                                </Button>
                                            </label>
                                            {formik.touched.pictureUser && formik.errors.pictureUser?.file && (
                                                <Typography color="error">{formik.errors.pictureUser.file}</Typography>
                                            )}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" type="submit" fullWidth disabled={!formik.dirty}>
                                                Crear usuario
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}