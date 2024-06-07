import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, Paper, Typography, Link as MuiLink, Radio, RadioGroup, FormControlLabel, IconButton } from "@mui/material";
import { EcommerceUI } from "../../ui";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useGetAddressByIdQuery, usePostOrderMutation, useGetUserByTokenQuery, useDeleteAddressMutation, useGetShippingPriceQuery } from '../../store/api';
import { setShippingInfo } from '../../store/shippingInfo/shippingInfoSlice';
import AddAddressModal from '../component/AddAddressModal';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const ShippingInfoPage = () => {
    const { cartTotalAmount, cartItems } = useSelector(state => state.cart);
    const token = localStorage.getItem('token');
    const { data: user, refetch: refetchUserData } = useGetUserByTokenQuery(token);
    const dispatch = useDispatch();
    const shippingInfo = useSelector(state => state.shippingInfo);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showNoAddressesMessage, setShowNoAddressesMessage] = useState(false); 
    const [shippingCost, setShippingCost] = useState(0);
    const [selectedShippingOption, setSelectedShippingOption] = useState('');

    const [createOrder] = usePostOrderMutation();
    const { data: addresses, error, isLoading: addressesLoading, refetch: refetchAddresses } = useGetAddressByIdQuery(user?.idUser, {
        skip: !user?.idUser,
    });
    const [deleteAddress] = useDeleteAddressMutation();

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => setModalOpen(false);

    const handleSaveAddress = async (address) => {
        dispatch(setShippingInfo(address));
        await refetchAddresses();
    };

    useEffect(() => {
        if (addresses && addresses.length > 0) {
            const firstAddress = addresses[0];
            const formattedAddress = {
                id: firstAddress.idUserAddress.toString(),
                name: user?.nameUser || '',
                address: firstAddress.addressName || '',
                city: firstAddress.cityAddress || '',
                numberAddress: firstAddress.numberAddress || '',
                province: firstAddress.provinceAddress || '',
                postalCode: firstAddress.postalCode || '',
                country: firstAddress.country || '',
                phoneArea: user?.phoneArea || '',
                phoneNumber: user?.numberMobileUser || '',
                identifierName: firstAddress.identifierName || ''
            };
            setSelectedAddress(formattedAddress.id);
            dispatch(setShippingInfo(formattedAddress));
            setShowNoAddressesMessage(false);
        } else {
            setShowNoAddressesMessage(true);
        }
    }, [addresses, user, dispatch]);

    const handleAddressChange = (event) => {
        const addressId = event.target.value;
        setSelectedAddress(addressId);
        const address = addresses?.find(addr => addr.idUserAddress.toString() === addressId);
        if (address) {
            dispatch(setShippingInfo({
                name: user?.nameUser || '',
                address: address.addressName || '',
                city: address.cityAddress || '',
                numberAddress: address.numberAddress || '',
                province: address.provinceAddress || '',
                postalCode: address.postalCode || '',
                country: address.country || '',
                phoneArea: user?.phoneArea || '',
                phoneNumber: user?.numberMobileUser || '',
                identifierName: address.identifierName || ''
            }));
        } else {
            console.error('Address not found');
        }
    };

    const address = addresses?.find(addr => addr.idUserAddress.toString() === selectedAddress);
    const postalCode = address?.postalCode;
    const { data: shippingPrices, refetch: refetchShippingPrices } = useGetShippingPriceQuery(postalCode, {
        skip: !postalCode
    });

    useEffect(() => {
        if (shippingPrices) {
            setShippingCost(shippingPrices.aSucursal); // Default to aSucursal or any logic to set initial value
            setSelectedShippingOption('aSucursal');
        }
    }, [shippingPrices]);

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteAddress(addressId).unwrap();
            await refetchAddresses();
        } catch (error) {
            console.error('Failed to delete address:', error);
        }
    };

    const formattedPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {}).format(Math.round(parseFloat(price)));
    };

    const handleShippingOptionChange = (event) => {
        const option = event.target.value;
        if (option === 'aSucursal' || option === 'aDomicilio') {
            setShippingCost(shippingPrices[option]);
            setSelectedShippingOption(option);
        }
    };

    const handlePayment = async () => {
        try {
            if (!createOrder) {
                console.error('La función createOrder no está definida.');
                return;
            }
    
            if (!cartItems || cartItems.length === 0) {
                console.error('El carrito está vacío.');
                return;
            }
    
            const { emailUser, DNI, nameUser, lastNameUser } = user || {};
    
            const cartItemsWithPrice = cartItems.map(item => ({
                ...item,
                priceProduct: parseFloat(item.priceProduct) || 0,
            }));
    
            const payerData = {
                email: emailUser,
                identification: {
                    type: "DNI",
                    number: DNI || '',
                },
                name: nameUser || '',
                surname: lastNameUser || '',
            };
    
            const orderItems = cartItemsWithPrice.map(item => {
                const unitPrice = item.discountPriceProduct ? parseFloat(item.discountPriceProduct) : parseFloat(item.priceProduct);
                return {
                    id: item.idProduct,
                    category_id: item.idCategory.toString(),
                    title: item.nameProduct,
                    unit_price: unitPrice,
                    quantity: item.quantity,
                    currency_id: "ARS"
                };
            });
    
            // Añadir el costo de envío como un ítem adicional
            if (shippingCost > 0) {
                orderItems.push({
                    id: 'shipping',
                    category_id: 'shipping',
                    title: selectedShippingOption === 'aSucursal' ? 'Envío a Sucursal' : 'Envío a Domicilio',
                    unit_price: parseInt(shippingCost),
                    quantity: 1,
                    currency_id: "ARS"
                });
            }
    
            const orderData = {
                items: orderItems,
                payer: payerData,
            };
    
            console.log('Datos de la orden de compra:', orderData);
    
            const response = await createOrder(orderData).unwrap();
            console.log('Order created:', response);
    
            if (response.init_point) {
                window.location.href = response.init_point;
            } else {
                console.error('init_point is missing in the response');
            }
        } catch (error) {
            console.error('Failed to create order:', error);
            if (error.data) {
                console.error('Error details:', error.data);
            }
        }
    };

    return (
        <EcommerceUI>
            <MuiLink component={Link} to="/" sx={{ margin: '50px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <ArrowBackIcon />
            </MuiLink>
            <Box sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: 1200, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom>Datos de envío</Typography>
                {showNoAddressesMessage ? (
                    <Box textAlign="center" mt={5}>
                        <LocalShippingIcon sx={{ fontSize: 80 }} />
                        <Typography variant="h6" mt={2}>No hay direcciones disponibles</Typography>
                        <Box mt={2}>
                            <Button variant="contained" onClick={handleModalOpen}>
                                Agregar Dirección
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                                    <Typography variant="h5">Direcciones Guardadas</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
                                        {addresses?.map((address, index) => (
                                            <FormControlLabel
                                                key={address.idUserAddress}
                                                value={address.idUserAddress.toString()}
                                                control={<Radio />}
                                                label={
                                                    <Box>
                                                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                                                            <Box padding={'10px'}>
                                                                <Typography variant="body1"><strong>Residencia:</strong> {address.identifierName}</Typography>
                                                                <Typography variant="body1"><strong>Dirección:</strong> {address.addressName} {address.numberAddress} <br /> {address.cityAddress}, {address.provinceAddress}, {address.country} </Typography>
                                                                <Typography variant="body1"><strong>Código Postal:</strong> {address.postalCode}</Typography>
                                                                <Typography variant="body1"><strong>Recibe:</strong> {user?.nameUser} {user?.lastNameUser}</Typography>
                                                            </Box>
                                                            <Box>
                                                                <IconButton onClick={() => handleDeleteAddress(address.idUserAddress)} color="secondary">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                {/* <IconButton component={Link} to="/user/address" color="primary">
                                                                    <EditIcon />
                                                                </IconButton> */}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        ))}
                                    </RadioGroup>
                                    <Box mt={2}>
                                        <Button variant="contained" onClick={handleModalOpen}>
                                            Agregar otra dirección
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                                    <Typography variant="h5" sx={{ mb: 1 }}>Resumen de compra</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography variant="h6">Subtotal</Typography>
                                        <Typography variant="h6">$ {formattedPrice(cartTotalAmount)}</Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    {shippingPrices && (
                                        <Box>
                                            <Typography variant="h6" gutterBottom>Opciones de envío</Typography>
                                            <RadioGroup value={selectedShippingOption} onChange={handleShippingOptionChange}>
                                                <FormControlLabel
                                                    value="aSucursal"
                                                    control={<Radio />}
                                                    label={`Envío a Sucursal: $${formattedPrice(shippingPrices.aSucursal)}`}
                                                />
                                                <FormControlLabel
                                                    value="aDomicilio"
                                                    control={<Radio />}
                                                    label={`Envío a Domicilio: $${formattedPrice(shippingPrices.aDomicilio)}`}
                                                />
                                            </RadioGroup>
                                        </Box>
                                    )}
                                    <Divider sx={{ mb: 2 }} />
                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography variant="h6">Total</Typography>
                                        <Typography variant="h6">$ {formattedPrice(cartTotalAmount + shippingCost)}</Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        onClick={handlePayment}
                                    >
                                        Pagar
                                    </Button>
                                    <Box mt={2}>
                                        <MuiLink component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                            <ArrowBackIcon />
                                            <Typography variant="button" ml={1}>Cancelar compra</Typography>
                                        </MuiLink>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
            <AddAddressModal open={modalOpen} handleClose={handleModalClose} onSave={handleSaveAddress} />
        </EcommerceUI>
    );
};