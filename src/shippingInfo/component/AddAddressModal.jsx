import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDepartmentsQuery, useGetPostalCodesQuery, useGetProvinceQuery, useGetUserByTokenQuery, usePostCreateAddressMutation } from '../../store/api';
import { setShippingInfo } from '../../store/shippingInfo/shippingInfoSlice';

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

    const [localShippingInfo, setLocalShippingInfo] = useState({
        addressName: '',
        numberAddress: '',
        identifierName: '',
        provinceAddress: '',
        city: '',
        postalCode: '',
    });

    const [postAddress] = usePostCreateAddressMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (open) {
            // Restablecer los campos del formulario al estado inicial
            setLocalShippingInfo({
                addressName: '',
                numberAddress: '',
                identifierName: '',
                provinceAddress: '',
                city: '',
                postalCode: '',
            });
        }
    }, [open]);

    const handleProvinceChange = (e) => {
        const { value } = e.target;
        setSelectedProvince(value);
        setLocalShippingInfo(prev => ({ ...prev, provinceAddress: value, city: '', postalCode: '' }));
    };

    const handleDepartmentChange = (e) => {
        const { value } = e.target;
        setSelectedDepartment(value);
        setLocalShippingInfo(prev => ({ ...prev, city: value, postalCode: '' }));
    };

    const handlePostalCodeChange = (e) => {
        const { value } = e.target;
        setLocalShippingInfo(prev => ({ ...prev, postalCode: value }));
    };

    const handleSubmit = async () => {
        try {
            if (!idUser) {
                console.error('User ID is undefined');
                return;
            }

            const requiredFields = ['identifierName', 'numberAddress', 'addressName', 'postalCode', 'provinceAddress', 'city'];
            const isEmpty = requiredFields.some(field => !localShippingInfo[field]);

            if (isEmpty) {
                console.error('All required fields must be filled');
                alert('Todos los campos requeridos deben ser completados.');
                return;
            }

            const newAddress = {
                emailUser: user.emailUser,
                identifierName: localShippingInfo.identifierName,
                numberAddress: localShippingInfo.numberAddress,
                addressName: localShippingInfo.addressName,
                postalCode: localShippingInfo.postalCode,
                provinceAddress: localShippingInfo.provinceAddress,
                cityAddress: localShippingInfo.city,
                country: 'Argentina'
            };
            
            const response = await postAddress({ idUser, ...newAddress }).unwrap();
            dispatch(setShippingInfo(localShippingInfo));
            handleSave(localShippingInfo);
            handleClose(true);
        } catch (error) {
            console.error('Error creating address:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>Agregar Dirección</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label="Calle"
                            name="addressName"
                            value={localShippingInfo.addressName}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Numero"
                            name="numberAddress"
                            value={localShippingInfo.numberAddress}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Residencia (casa)"
                            name="identifierName"
                            value={localShippingInfo.identifierName}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="province-label">Provincia</InputLabel>
                            <Select
                                labelId="province-label"
                                id="province-select"
                                value={localShippingInfo.provinceAddress}
                                name="provinceAddress"
                                onChange={handleProvinceChange}
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
                                value={localShippingInfo.city}
                                name="city"
                                onChange={handleDepartmentChange}
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
                                value={localShippingInfo.postalCode}
                                name="postalCode"
                                onChange={handlePostalCodeChange}
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
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default AddAddressModal;