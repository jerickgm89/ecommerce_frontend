import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const bannerItems = [
  {
    text: "¡Solo por hoy! 20% de reintegro con tarjeta Cabal de Banco Credicoop",
  },
  {
    text: "🖥️ Hasta 35% Off y 9 cuotas sin interés en Smart TVs",
  },
  {
    text: "💦 Hasta 6 cuotas sin interés en Lavarropas",
  },
];

export const BannerItems = () => {
  return (
    <Box bgcolor="white" color="black" p={1}>

      <Carousel 
            indicators={false} 
            // navButtonsAlwaysVisible={true}
            // navButtonsProps={{   
            //     style: {
            //       backgroundColor: 'transparent',
            //       color: 'black',
                
            //     }
            //   }}

        
      >
       
        

        {bannerItems.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="center" px={2}>
            {item.icon}
            <Typography variant="h8" ml={1} sx={{color:"#4a4a4a"}}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
