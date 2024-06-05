import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useGetDepartmentsQuery, useGetPostalCodesQuery, useGetProvinceQuery } from '../../store/api';
import * as Yup from 'yup';

export const ContactForm = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCitiesCode, setSelectedCities] = useState('');

  const { data: provincesData, error: provinceError, isLoading: provinceLoading } = useGetProvinceQuery();
  const { data: departmentsData, error: departmentError, isLoading: departmentLoading } = useGetDepartmentsQuery(selectedProvince, { skip: !selectedProvince });
  const { data: cities, error: citiesError, isLoading: citiesLoading } = useGetPostalCodesQuery({ province: selectedProvince, department: selectedDepartment }, { skip: !selectedProvince || !selectedDepartment });

  const provinces = provincesData ? [...provincesData].sort((a, b) => a.localeCompare(b)) : [];
  const departments = departmentsData ? [...departmentsData].sort((a, b) => a.localeCompare(b)) : [];

  const handleProvinceChange = (e, setFieldValue) => {
    const { value } = e.target;
    setSelectedProvince(value);
    setSelectedDepartment('');
    setSelectedCities('');
    setFieldValue('province', value);
    setFieldValue('departament', '');
    setFieldValue('cities', '');
  };

  const handleDepartmentChange = (e, setFieldValue) => {
    const { value } = e.target;
    setSelectedDepartment(value);
    setSelectedCities('');
    setFieldValue('departament', value);
    setFieldValue('cities', '');
  };

  const handleCitiesCodeChange = (e, setFieldValue) => {
    const { value } = e.target;
    setSelectedCities(value);
    setFieldValue('cities', value);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es obligatorio'),
    lastName: Yup.string().required('El apellido es obligatorio'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    phone: Yup.string()
      .matches(/^(0?\d{2,4})?\d{6,8}$/, 'Característica sin el 0 y número sin el 15')
      .required('El teléfono es obligatorio'),
    province: Yup.string().required('La provincia es obligatoria'),
    departament: Yup.string().required('El departamento es obligatorio'),
    cities: Yup.string().required('La ciudad es obligatoria'),
    query: Yup.string().required('La consulta es obligatoria'),
  });

  return (
    <Box> {/* Centra el contenido verticalmente */}
    
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        province: '',
        departament: '',
        cities: '',
        query: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
        
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} >
              <Field
                as={TextField}
                name="firstName"
                label="Nombre"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="lastName"
                label="Apellido"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12} >
              <Field
                as={TextField}
                name="email"
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="phone"
                label="Teléfono"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="province-label">Provincia</InputLabel>
                <Field
                  as={Select}
                  labelId="province-label"
                  id="province-select"
                  name="province"
                  value={values.province}
                  onChange={(e) => handleProvinceChange(e, setFieldValue)}
                  onBlur={handleBlur}
                  error={touched.province && Boolean(errors.province)}
                >
                  {provinceLoading && <MenuItem disabled>Cargando provincias...</MenuItem>}
                  {provinceError && <MenuItem disabled>Error al cargar provincias</MenuItem>}
                  {provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Field>
                {touched.province && Boolean(errors.province) && (
                  <div style={{ color: 'red' }}>{errors.province}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Departamento</InputLabel>
                <Field
                  as={Select}
                  labelId="department-label"
                  id="department-select"
                  name="departament"
                  value={values.departament}
                  onChange={(e) => handleDepartmentChange(e, setFieldValue)}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!selectedProvince}
                  error={touched.departament && Boolean(errors.departament)}
                >
                  {departmentLoading && <MenuItem disabled>Cargando departamentos...</MenuItem>}
                  {departmentError && <MenuItem disabled>Error al cargar departamentos</MenuItem>}
                  {departments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Field>
                {touched.departament && Boolean(errors.departament) && (
                  <div style={{ color: 'red' }}>{errors.departament}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="cities-label">Ciudad</InputLabel>
                <Field
                  as={Select}
                  labelId="cities-label"
                  id="cities-select"
                  name="cities"
                  value={values.cities}
                  onChange={(e) => handleCitiesCodeChange(e, setFieldValue)}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!selectedProvince || !selectedDepartment}
                  error={touched.cities && Boolean(errors.cities)}
                >
                  {citiesLoading && <MenuItem disabled>Cargando códigos postales...</MenuItem>}
                  {citiesError && <MenuItem disabled>Error al cargar códigos postales</MenuItem>}
                  {cities && Object.keys(cities).map((locality) => (
                    <MenuItem key={locality} value={locality}>
                      {locality.split(':')[0]}
                    </MenuItem>
                  ))}
                </Field>
                {touched.cities && Boolean(errors.cities) && (
                  <div style={{ color: 'red' }}>{errors.cities}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <Field
                as={TextField}
                name="query"
                label="Consulta"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.query}
                error={touched.query && Boolean(errors.query)}
                helperText={touched.query && errors.query}
              />
            </Grid>
            <Grid item xs={12} style={{justifyContent: "center"}}>
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
    </Box>
  );
};
