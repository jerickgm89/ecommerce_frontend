import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Typography, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

export const TermsCondition = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>
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
        <Typography onClick={handleClickOpen} sx={{ textDecoration: 'underline', cursor: 'pointer'}}>
        Terminos y Condiciones
        </Typography>

        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Términos y Condiciones de Uso
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Por favor, lea cuidadosamente los siguientes términos y condiciones antes de crear una cuenta en nuestro sitio web.
          </Typography>
          <Typography gutterBottom>
            <strong>1. Aceptación de los Términos: </strong>Al crear una cuenta en nuestro sitio web, usted acepta cumplir con estos términos y condiciones de uso, así como con nuestras políticas de privacidad y seguridad.
          </Typography>
          <Typography gutterBottom>
            <strong>2. Creación de la Cuenta: </strong>Para crear una cuenta en nuestro sitio, debe proporcionar información precisa y completa durante el proceso de registro. Es su responsabilidad mantener la confidencialidad de su nombre de usuario y contraseña, y usted es responsable de todas las actividades que ocurran bajo su cuenta.
          </Typography>
          <Typography gutterBottom>
            <strong>3. Uso Aceptable: </strong>Usted acepta utilizar nuestro sitio web de manera responsable y respetuosa. No debe utilizar nuestro sitio para enviar spam, publicar contenido ofensivo o infringir los derechos de autor de terceros.
          </Typography>
          <Typography gutterBottom>
            <strong>4. Privacidad y Seguridad: </strong>Nos comprometemos a proteger su privacidad y seguridad. Su información personal será tratada de acuerdo con nuestras políticas de privacidad y seguridad, las cuales puede consultar en nuestro sitio web.
          </Typography>
          <Typography gutterBottom>
            <strong>5. Comunicaciones: </strong>Al crear una cuenta, usted acepta recibir comunicaciones de nuestra parte, incluyendo correos electrónicos relacionados con su cuenta, promociones y actualizaciones del sitio. Puede optar por no recibir estas comunicaciones en cualquier momento.
          </Typography>
          <Typography gutterBottom>
            <strong>6. Propiedad Intelectual: </strong>Todos los derechos de propiedad intelectual relacionados con nuestro sitio web y su contenido son propiedad nuestra o de nuestros licenciantes. Usted no tiene derecho a utilizar nuestro nombre, logotipo o contenido sin nuestro consentimiento previo por escrito.
          </Typography>
          <Typography gutterBottom>
            <strong>7. Modificaciones: </strong>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le notificaremos cualquier cambio en nuestro sitio web y su uso continuado del sitio constituirá su aceptación de los términos modificados.
          </Typography>
          <Typography gutterBottom>
            <strong>8. Terminación de la Cuenta: </strong>Nos reservamos el derecho de suspender o cancelar su cuenta en cualquier momento si viola estos términos y condiciones o nuestras políticas.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Aceptar
          </Button>
        </DialogActions>
      </BootstrapDialog>    
      </Grid>
      
    </>
  )
}
