import { useGetDetailsByTokenQuery, useGetOrderByIdQuery } from "../../store/api/ecommerceShopApi";
import { Box, Grid, IconButton, Typography } from "@mui/material"
import { 
  ShoppingBagOutlined as ShoppingBagIcon,
  ArrowForward as ArrowForwardIcon
} from "@mui/icons-material"
import { format, parseISO } from 'date-fns';

const TOKEN = localStorage.getItem('token');
console.log(TOKEN);
export const OrderList = () => {
  
  const { data: orders, isLoading } = useGetDetailsByTokenQuery(TOKEN);
  console.log(orders);
  

  
  return (
    <Grid item xs={6} md={8} sx={{display: 'flex', justifyContent: 'left'}}>
    <Grid container>
      <Grid xs={10} margin={2}>
        <Typography variant="h4" sx={{mt: 4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
          <div>
            <ShoppingBagIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
            Mis Ordenes
          </div>
        </Typography>
        {/* This is the list of orders */}
        {
          isLoading ? (
            <div>Cargando...</div>
          ) : (
            orders && orders.orderItems ? (
              orders.orderItems.length > 0 ? (
                orders.orderItems.map((order, index) => (
                  <Grid container spacing={1} key={index} sx={{mt:1}}>
                    <GridItem xs={3} text={order.idOrder} />
                    <GridItem xs={2} text={getStatusText(order.status)} style={getStatusStyle(order.status)} />
                    <GridItem xs={3} text={format(parseISO(order.createentityOrderDetail), 'MMM dd, yyyy')} />
                    <GridItem xs={1} text={`$${order.entityProduct.priceProduct}`} />
                    <Grid xs={3} sx={{backgroundColor: '#fff', borderRadius:2}}>
                      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%'}}>
                        <IconButton aria-label="delete" size="small" color="primary"><ArrowForwardIcon /></IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Typography variant="h5" align="left">No tienes ordenes disponibles</Typography>
              )
            ) : (
              <Typography variant="h5" align="left">No tienes ordenes disponibles</Typography>
            )
          )
        }

      </Grid>
    </Grid>
  </Grid>
  )
}

const GridItem = ({ xs, text, style }) => (
  <Grid xs={xs} sx={{backgroundColor: '#fff', borderRadius:2, p:1}}>
    <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <Typography variant="body1" sx={{fontSize: 15, textAlign: 'left', ...style}}>{text}</Typography>
    </Box>
  </Grid>
);

const getStatusText = (status) => {
  switch (status) {
    case 'approved':
      return 'Aprobado';
    case 'rejected':
      return 'Rechazado';
    case 'in_process':
        return 'Pendiente';
    default:
      return status;
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'approved':
      return { backgroundColor: 'rgba(0, 255, 0, 0.1)', color: 'green', borderRadius: '5px', padding: '5px' };
    case 'rejected':
      return { backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red', borderRadius: '5px', padding: '5px' };
    case 'in_process':
      return { backgroundColor: 'rgba(128, 128, 128, 0.1)', color: 'grey', borderRadius: '5px', padding: '5px' };
    default:
      return {};
  }
};

