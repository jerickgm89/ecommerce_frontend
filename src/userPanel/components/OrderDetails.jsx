import { useGetOrderOperationQuery } from "../../store/api/ecommerceShopApi";
import {  Box, Button, Divider, Grid, Typography, Dialog, DialogContent } from "@mui/material"
import { AddNewReview } from "./AddNewReview";

import {
  ShoppingBagOutlined as ShoppingBagIcon
} from '@mui/icons-material';

import { StepperComponent } from "./StepperComponent";
import { useParams } from "react-router-dom";
import { useState } from "react";


export const OrderDetails = () => {

  const { operation } = useParams();
  const { data: order, isLoading: isLoadingOrder, error: errorOrder } = useGetOrderOperationQuery(operation);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };



  return (

    <Grid item xs={12} md={12} lg={8} sx={{display: 'flex', justifyContent: 'left'}}>
    <Grid container >
      <Typography variant="h4" sx={{mt: 4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', justifyContent: 'left', fontWeight: 'bold'}}>
        <div>
          <ShoppingBagIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
          Detalle de la Orden
        </div>
      </Typography>
      <Grid item xs={12} sx={{mr:2}}>
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
                  {console.log(orderItem.status)}
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClickOpen}
                    disabled={item.status !== 'approved'}
                  >
                    Escribir una resena
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                      <AddNewReview handleClose={handleClose} productId={item.entityProduct.idProduct}/>
                    </DialogContent>
                  </Dialog>
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



