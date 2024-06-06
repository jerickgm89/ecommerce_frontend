import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const bannerItems = [
  {
    icon: <img src="https://images.fravega.com/f100/165db2d0462bd48b0529bd51d748c281.png" alt="" style={{ width: "200px", height: "auto" }} />,
    text: "Pagá con crédito y débito",
  },

  {
    icon: <img src="https://images.fravega.com/f100/6bf1fed1be0627c5af4a0c629bc887b3.png" alt="" style={{ width: "30px", height: "30px"}}/>,
    text: "Ofertas todos los dias",
  },
  // {
  //   text: "💦 Hasta 6 cuotas sin interés en Lavarropas",
  // },
];

export const BannerItems = () => {
  return (
    <Box bgcolor="white" color="black" p={1}>

      <Carousel 
            indicators={false} 
      >
       


        {bannerItems.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="center" px={2} >
            {item.icon && <Box mr={2}>{item.icon}</Box>}
            <Typography variant="h8"  sx={{color:"#4a4a4a"}}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
