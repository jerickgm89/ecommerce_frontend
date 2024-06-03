import React from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';

const ShippingInfoModal = ({ open, onClose, shippingInfo, handleInputChange, handlePayment }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Datos del Envío
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            value={shippingInfo.name}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="DNI"
                            name="DNI"
                            value={shippingInfo.DNI}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Área (+54)"
                            name="phoneArea"
                            value={shippingInfo.phoneArea}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Teléfono (Número Móvil)"
                            name="numberMobileUser"
                            value={shippingInfo.numberMobileUser}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Dirección"
                            name="addressName"
                            value={shippingInfo.addressName}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Número de Dirección"
                            name="numberAddress"
                            value={shippingInfo.numberAddress}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Código Postal"
                            name="postalCode"
                            value={shippingInfo.postalCode}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Provincia"
                            name="provinceAddress"
                            value={shippingInfo.provinceAddress}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Ciudad"
                            name="cityAddress"
                            value={shippingInfo.cityAddress}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="País"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePayment}
                                sx={{ flexGrow: 1 }}
                            >
                                Proceder al Pago
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onClose}
                                sx={{ ml: 1, flexGrow: 1 }}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default ShippingInfoModal;
