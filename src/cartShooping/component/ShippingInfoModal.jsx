import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const ShippingInfoModal = ({ open, onClose, shippingInfo, handleInputChange, handlePayment }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Información de Envío
                </Typography>
                {/* <TextField
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                /> */}
                {/* <TextField
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                /> */}
                {/* <TextField
                    fullWidth
                    label="Ciudad"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                /> */}
                {/* <TextField
                    fullWidth
                    label="Código Postal"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                /> */}
                {/* <TextField
                    fullWidth
                    label="País"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                /> */}
                {/* <TextField
                    fullWidth
                    label="Teléfono"
                    name="phoneNumber" // Nombre del campo de número de teléfono
                    value={shippingInfo.phoneNumber} // Valor del número de teléfono
                    onChange={handleInputChange} // Manejador para cambios en el número de teléfono
                    sx={{ mb: 2 }}
                /> */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePayment}
                >
                    Proceder al Pago
                </Button>
            </Box>
        </Modal>
    );
};

export default ShippingInfoModal;