import { useGetUserByTokenQuery } from '../../store/api/ecommerceUserApi';
import 
{ 
  usePostCreateAddressMutation, 
  useGetDepartmentsQuery, 
  useGetProvinceQuery, 
  useGetPostalCodesQuery 
} from '../../store/api/ecommerceAddressApi'
import { useNavigate, Link } from 'react-router-dom';
import { Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { 
  Place as PlaceIcon,
} from "@mui/icons-material";
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'
import { useState } from 'react';

const TOKEN = localStorage.getItem('token');

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
    postalCode: yup
      .string()
      .required('El codigo postal es requerido'),  
});

export const UserAddAddress = () => {
  const navigate = useNavigate();

  const { data: userData, isLoading } = useGetUserByTokenQuery(TOKEN);

  const { data: provinces, isLoading: isLoadingProvinces } = useGetProvinceQuery();
  const [selectProvince, setSelectProvince] = useState('');

  const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery(selectProvince, {skip: !selectProvince});
  const [selectDepartment, setSelectDepartment] = useState('');

  const { data: postalCodes, isLoading: isLoadingPostalCodes } = useGetPostalCodesQuery({ province: selectProvince, department: selectDepartment }, { skip: !selectProvince || !selectDepartment });
  const [selectPostalCode, setSelectPostalCode] = useState('');

  const [updateAddressMutation] = usePostCreateAddressMutation();

  const fields = [
    { name: 'identifierName',   label: 'Nombre de la direccion',  type: 'text', placeholder: 'Ejm: Casa, Oficina, Casa de Playa, etc' },
    { name: 'addressName',      label: 'Direccion',               type: 'text', placeholder: 'Ingrese direccion'},
    { name: 'numberAddress',    label: 'Numero de calle',         type: 'text', placeholder: 'Ingrese su numero de calle, mz, lt' },
    { name: 'provinceAddress',  label: 'Provincia',               type: 'text', placeholder: 'Ingrese su Provincia' },
    { name: 'cityAddress',      label: 'Departamento',            type: 'text', placeholder: 'Ingrese su departamento' },
    { name: 'postalCode',       label: 'Codigo postal',           type: 'text', placeholder: 'Ingrese su codigo postal' },
  ];

  const handleProvinceChange = (event) => {
    setSelectProvince(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectDepartment(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setSelectPostalCode(event.target.value);
  };

  const handleCombinedChange = (event) => {
    formik.handleChange(event);
    handleProvinceChange(event);
  };

  const handleCombinedDepartmentChange = (event) => {
    formik.handleChange(event);
    handleDepartmentChange(event);
  };

  const handleCombinedPostalCodeChange = (event) => {
    formik.handleChange(event);
    handlePostalCodeChange(event);
  };

  const formik = useFormik({
    initialValues: {
      identifierName: "",
      addressName: "",
      numberAddress: "",
      provinceAddress: "",
      cityAddress: "",
      postalCode: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => { 
      updateAddressMutation({idUser:userData.idUser,...values})
        .unwrap()
        .then(response => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Direccion agregada',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){
            navigate('/user/address');
            window.location.reload();
          }, 2000);
        })
        .catch(error => {
          console.log(error)
          Swal.fire
          ({
            icon: 'error',
            title: 'Error al agregar direccion',
            showConfirmButton: false,
            timer: 1500
          })
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

          <Grid container >
            <Typography 
              variant="h4" 
              sx={{mt: 4, ml:4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', fontWeight: 'bold'}}
              >
              <div>
                <PlaceIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
                Agregar dirección
              </div>
              <Link to="/user/address" style={{ textDecoration: 'none', color: 'inherit', width: { xs: '100%', sm: 'auto' } }}>
                <Button variant="outlined" fullWidth={{ xs: true, sm: false }}>Volver</Button>
              </Link>
            </Typography>
            <Grid xs={12} marginBottom={4}>
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
                        {field.name === 'provinceAddress' ? (
                          <FormControl fullWidth>
                            <InputLabel>{field.label}</InputLabel>
                            <Select
                              name={field.name}
                              value={formik.values[field.name]}
                              onChange={handleCombinedChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                            >
                              {provinces && provinces.map((province, index) => (
                                <MenuItem key={index} value={province}>
                                  {province}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : field.name === 'cityAddress' ? (
                          <FormControl fullWidth>
                            <InputLabel>{field.label}</InputLabel>
                            <Select
                              name={field.name}
                              value={formik.values[field.name]}
                              onChange={handleCombinedDepartmentChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                            >
                              {departments && departments.map((department, index) => (
                                <MenuItem key={index} value={department}>
                                  {department}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : field.name === 'postalCode' ? (
                          <FormControl fullWidth>
                            <InputLabel>{field.label}</InputLabel>
                            <Select
                              name={field.name}
                              value={formik.values[field.name]}
                              onChange={handleCombinedPostalCodeChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                            >
                              {postalCodes && Object.keys(postalCodes).map((locality) => (
                                  <MenuItem key={locality} value={postalCodes[locality]}>
                                      {locality} - {postalCodes[locality]}
                                  </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                        )
                        }
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
