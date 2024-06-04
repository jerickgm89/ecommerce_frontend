import { useGetOrderOperationQuery } from "../../store/api/ecommerceShopApi";
import {  Box, Divider, Grid, Typography } from "@mui/material"

import {
  ShoppingBagOutlined as ShoppingBagIcon
} from '@mui/icons-material';

import { StepperComponent } from "./StepperComponent";
import { useParams } from "react-router-dom";


export const OrderDetails = () => {

  const { operation } = useParams();
  console.log(operation);

  const { data: order, isLoading: isLoadingOrder, error: errorOrder } = useGetOrderOperationQuery(operation);
  console.log(order);

  return (

    <Grid item xs={6} md={8} sx={{display: 'flex', justifyContent: 'left'}}>
    <Grid container>
      <Grid item xs={10} margin={2}>
        <Typography variant="h4" sx={{mt: 4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
          <div>
            <ShoppingBagIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
            Detalle de la Orden
          </div>
        </Typography>
        {/* <StepperComponent /> */}

        {/* Product details */}
        {
          isLoadingOrder ? <Typography>Cargando...</Typography> : 
          order && order.length > 0 ? order.map((orderItem, orderIndex) => (
            orderItem.entityOrderItems ? orderItem.entityOrderItems.map((item, index) => (
              item && item.entityProduct ? (
                <Box key={`${orderIndex}-${index}`} sx={{display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2, p:2, backgroundColor: '#fff', borderRadius: 2}}>
                  <img src={item.entityProduct.imageProducts[0]} alt={item.entityProduct.nameProduct} style={{width: '50px', height: '50px'}}/>
                  <Typography variant="h7">{item.entityProduct.nameProduct}</Typography>
                  <Typography variant="h7">${item.entityProduct.priceProduct}</Typography>
                  <Typography variant="h7">Write A Review</Typography>
                </Box>
              ) : null
            )) : null
          )) : null
        }

        {/* Shipping and total details */}
        <Grid container spacing={2} sx={{mt: 2}}>
          {/* <Grid item xs={6} sx={{backgroundColor: '#fff', borderRadius: 2}}>
            <Typography variant="h6">Direccion de envio</Typography>
            <Typography>Direccion del usuario mz 3 lt t</Typography>
          </Grid> */}
{
  isLoadingOrder ? <Typography>Cargando...</Typography> :
  order && order.length > 0 ? order.map((orderItem, orderIndex) => (
    <Grid key={orderIndex} item xs={12} sx={{backgroundColor: '#fff', borderRadius: 2, p:2}}>
      <Typography variant="h6">Detalle Total</Typography>
      <Box sx={{display: 'flex', justifyContent: 'space-between', my: 2}}>
        <Typography>Subtotal:</Typography>
        <Typography>${orderItem.totalOrder}</Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography>Descuento:</Typography>
        <Typography>${orderItem.couponApplied ? orderItem.discountedTotal : '0.00'}</Typography>
      </Box>
      <Divider />
      <Box sx={{display: 'flex', justifyContent: 'space-between', my:2}}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${orderItem.totalOrder}</Typography>
      </Box>
    </Grid>
  )) : null
}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  )
}



