import { useGetShopDetailsQuery, useGetShopOrderQuery } from "../../store/api/ecommerceShopApi";
import { useGetProductByIdQuery } from "../../store/api/ecommerceApi";
import {  Box, Divider, Grid, Typography } from "@mui/material"

import {
  ShoppingBagOutlined as ShoppingBagIcon
} from '@mui/icons-material';

import { StepperComponent } from "./StepperComponent";


export const OrderDetails = () => {

  const { data: orderDetails, error, isLoading } = useGetShopDetailsQuery();


  const { data: order, errorOrder, isLoadingOrder } = useGetShopOrderQuery();
  console.log(order);

  // const { data: details, errorDetails, isLoadingDetails } = useGetShopDetailsQuery();
  // console.log(details);

  const { data: product, errorProduct, isLoading: isLoadingProduct } = useGetProductByIdQuery(order[0]?.idProduct);
  // console.log(product);

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
        <StepperComponent />

        {/* Product details */}
        {
          isLoadingProduct ? <Typography>Cargando...</Typography> : 
          errorProduct ? <Typography>Error: {errorProduct}</Typography> : 
          <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2, p:2, backgroundColor: '#fff', borderRadius: 2}}>
            <img src={product?.imageProducts} alt={product?.nameProduct} style={{width: '50px', height: '50px'}}/>
            <Typography variant="h7">{product?.nameProduct}</Typography>
            <Typography variant="h7">${product?.priceProduct}</Typography>
            <Typography variant="h7">Write A Review</Typography>
          </Box>
        }

        {/* Shipping and total details */}
        <Grid container spacing={2} sx={{mt: 2}}>
          <Grid item xs={6} sx={{backgroundColor: '#fff', borderRadius: 2}}>
            <Typography variant="h6">Direccion de envio</Typography>
            <Typography>Direccion del usuario mz 3 lt t</Typography>
          </Grid>
          {
            isLoadingProduct ? <Typography>Cargando...</Typography> :
            errorProduct ? <Typography>Error: {errorProduct}</Typography> :
            <Grid item xs={6} sx={{backgroundColor: '#fff', borderRadius: 2}}>
              <Typography variant="h6">Detalle Total</Typography>
              <Box sx={{display: 'flex', justifyContent: 'space-between', my: 2}}>
                <Typography>Subtotal:</Typography>
                <Typography>${product.priceProduct}</Typography>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>Descuento:</Typography>
                <Typography>$0.00</Typography>
              </Box>
              <Divider />
              <Box sx={{display: 'flex', justifyContent: 'space-between', my:2}}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${product.priceProduct}</Typography>
              </Box>
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  )
}



