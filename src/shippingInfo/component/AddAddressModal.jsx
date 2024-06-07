import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useGetDepartmentsQuery, useGetPostalCodesQuery, useGetProvinceQuery, useGetUserByTokenQuery, usePostCreateAddressMutation, usePutUpdateUserMutation } from '../../store/api';
import { setShippingInfo } from '../../store/shippingInfo/shippingInfoSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  addressName: Yup.string().required('Calle es requerida'),
  numberAddress: Yup.string()
    .matches(/^\d{1,4}$/, 'Número debe ser un número de hasta 4 dígitos')
    .required('Número es requerido'),
  identifierName: Yup.string().required('Residencia es requerida'),
  provinceAddress: Yup.string().required('Provincia es requerida'),
  city: Yup.string().required('Ciudad es requerida'),
  postalCode: Yup.string().required('Código Postal es requerido'),
  DNI: Yup.string()
    .matches(/^\d{1,8}$/, 'DNI debe ser un número de hasta 8 dígitos')
    .required('DNI es requerido'),
  numberMobileUser: Yup.string()
    .matches(/^\d+$/, 'Teléfono debe contener solo números')
    .required('Teléfono es requerido'),
});

const AddAddressModal = ({ open, handleClose, handleSave }) => {
  const token = localStorage.getItem('token');
  const { data: provinces, error: provinceError, isLoading: provinceLoading } = useGetProvinceQuery();
  const { data: user } = useGetUserByTokenQuery(token);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const { data: departments, error: departmentError, isLoading: departmentLoading } = useGetDepartmentsQuery(selectedProvince, { skip: !selectedProvince });
  const { data: postalCodes, error: postalCodeError, isLoading: postalCodeLoading } = useGetPostalCodesQuery({ province: selectedProvince, department: selectedDepartment }, { skip: !selectedProvince || !selectedDepartment });
  const dispatch = useDispatch();

  const idUser = user?.idUser;

  const [postAddress] = usePostCreateAddressMutation();
  const [putUpdateUser] = usePutUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      addressName: '',
      numberAddress: '',
      identifierName: '',
      provinceAddress: '',
      city: '',
      postalCode: '',
      DNI: user?.DNI || '',
      numberMobileUser: user?.numberMobileUser || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!idUser) {
          console.error('User ID is undefined');
          return;
        }

        const updatedUserInfo = {
          ...user,
          DNI: values.DNI,
          numberMobileUser: values.numberMobileUser,
        };

        await putUpdateUser({ id: idUser, ...updatedUserInfo }).unwrap();

        const newAddress = {
          emailUser: user.emailUser,
          identifierName: values.identifierName,
          numberAddress: values.numberAddress,
          addressName: values.addressName,
          postalCode: values.postalCode,
          provinceAddress: values.provinceAddress,
          cityAddress: values.city,
        };

        await postAddress({ idUser, ...newAddress }).unwrap();
        dispatch(setShippingInfo(values));
        handleSave(values);
      } catch (error) {
        console.error('Error creating address:', error);
      } finally {
        handleClose();
      }
    },
  });

  useEffect(() => {
    if (open) {
      // Restablecer los campos del formulario al estado inicial
      formik.resetForm();
      formik.setValues({
        addressName: '',
        numberAddress: '',
        identifierName: '',
        provinceAddress: '',
        city: '',
        postalCode: '',
        DNI: user?.DNI || '',
        numberMobileUser: user?.numberMobileUser || '',
      });
    }
  }, [open]);

  const handleProvinceChange = (e) => {
    const { value } = e.target;
    setSelectedProvince(value);
    formik.setFieldValue('provinceAddress', value);
    formik.setFieldValue('city', '');
    formik.setFieldValue('postalCode', '');
  };

  const handleDepartmentChange = (e) => {
    const { value } = e.target;
    setSelectedDepartment(value);
    formik.setFieldValue('city', value);
    formik.setFieldValue('postalCode', '');
  };

  const handlePostalCodeChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue('postalCode', value);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Agregar Dirección</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Calle"
                name="addressName"
                value={formik.values.addressName}
                onChange={formik.handleChange}
                error={formik.touched.addressName && Boolean(formik.errors.addressName)}
                helperText={formik.touched.addressName && formik.errors.addressName}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Número"
                name="numberAddress"
                value={formik.values.numberAddress}
                onChange={formik.handleChange}
                error={formik.touched.numberAddress && Boolean(formik.errors.numberAddress)}
                helperText={formik.touched.numberAddress && formik.errors.numberAddress}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4 }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Residencia (casa)"
                name="identifierName"
                value={formik.values.identifierName}
                onChange={formik.handleChange}
                error={formik.touched.identifierName && Boolean(formik.errors.identifierName)}
                helperText={formik.touched.identifierName && formik.errors.identifierName}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="province-label">Provincia</InputLabel>
                <Select
                  labelId="province-label"
                  id="province-select"
                  value={formik.values.provinceAddress}
                  name="provinceAddress"
                  onChange={handleProvinceChange}
                  error={formik.touched.provinceAddress && Boolean(formik.errors.provinceAddress)}
                  label="Provincia"
                >
                  {provinceLoading && <MenuItem disabled>Cargando provincias...</MenuItem>}
                  {provinceError && <MenuItem disabled>Error al cargar provincias</MenuItem>}
                  {provinces && provinces.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="department-label">Departamento</InputLabel>
                <Select
                  labelId="department-label"
                  id="department-select"
                  value={formik.values.city}
                  name="city"
                  onChange={handleDepartmentChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  label="Departamento"
                  disabled={!selectedProvince}
                >
                  {departmentLoading && <MenuItem disabled>Cargando departamentos...</MenuItem>}
                  {departmentError && <MenuItem disabled>Error al cargar departamentos</MenuItem>}
                  {departments && departments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="postalcode-label">Código Postal</InputLabel>
                <Select
                  labelId="postalcode-label"
                  id="postalcode-select"
                  value={formik.values.postalCode}
                  name="postalCode"
                  onChange={handlePostalCodeChange}
                  error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                  label="Código Postal"
                  disabled={!selectedDepartment}
                >
                  {postalCodeLoading && <MenuItem disabled>Cargando códigos postales...</MenuItem>}
                  {postalCodeError && <MenuItem disabled>Error al cargar códigos postales</MenuItem>}
                  {postalCodes && Object.keys(postalCodes).map((locality) => (
                    <MenuItem key={locality} value={postalCodes[locality]}>
                      {locality} - {postalCodes[locality]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="DNI"
                name="DNI"
                value={formik.values.DNI}
                onChange={formik.handleChange}
                error={formik.touched.DNI && Boolean(formik.errors.DNI)}
                helperText={formik.touched.DNI && formik.errors.DNI}
                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 8 }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="numberMobileUser"
                value={formik.values.numberMobileUser}
                onChange={formik.handleChange}
                error={formik.touched.numberMobileUser && Boolean(formik.errors.numberMobileUser)}
                helperText={formik.touched.numberMobileUser && formik.errors.numberMobileUser}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" variant="contained">Guardar</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAddressModal;
