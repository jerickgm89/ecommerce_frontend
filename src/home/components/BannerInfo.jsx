import { Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

export const BannerInfo = () => {
  return (
    <Box bgcolor="white" color="black"  p={2}  sx={{display:"flex", justifyContent:"center"}}>
      <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
        <LocalShippingOutlinedIcon fontSize="large" sx={{color: "#4a4a4a"}}/>
        <Typography variant="h8" ml={1} sx={{color:"#4a4a4a"}}>
            Envios a todo el pais
          
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
        <CreditCardOutlinedIcon fontSize="large" sx={{color: "#4a4a4a"}} />
        <Typography variant="h8" ml={1} sx={{color: "#4a4a4a"}}>
          Paga con tarjeta de crédito o débito
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <VerifiedOutlinedIcon fontSize="large" sx={{color: "#4a4a4a"}} />
        <Typography variant="h8" ml={1} sx={{color: "#4a4a4a"}}>
          Compra segura 
        </Typography>
      </Box>
      
    </Box>
  );
};
