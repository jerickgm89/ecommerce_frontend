import { useGetDetailsByTokenQuery, useGetOrderByIdQuery } from "../../store/api/ecommerceShopApi";
import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi";
import { Box, Grid, IconButton, Typography } from "@mui/material"
import { 
  ShoppingBagOutlined as ShoppingBagIcon,
  ArrowForward as ArrowForwardIcon
} from "@mui/icons-material"
import { format, parseISO } from 'date-fns';
import { is } from "date-fns/locale";
import { Link } from "react-router-dom";

const TOKEN = localStorage.getItem('token');
console.log(TOKEN);
export const OrderList = () => {
  
  const { data: userData, isLoading: isLoadingUser } = useGetUserByTokenQuery(TOKEN);
  const idUser = userData ? userData.idUser : '';
  const {data: orderList, isLoading: isLoadingOrder } = useGetOrderByIdQuery(idUser);
  console.log(orderList);

  
  return (
    <Grid item xs={12} md={12} lg={8} sx={{display: 'flex', justifyContent: 'left'}}>
    <Grid container justifyContent="center" alignItems="center">
      <Grid xs={10} margin={2}>
        <Typography variant="h4" sx={{mt: 4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
          <div>
            <ShoppingBagIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
            Mis Ordenes
          </div>
        </Typography>
        {/* This is the list of orders */}
        {
          isLoadingOrder ? (
            <div>Cargando...</div>
          ) : (
            orderList && orderList.length > 0 ? (
              orderList.map((order, index) => (
                order.entityOrderItems.map((item, itemIndex) => (
                  <Link to={`/user/orderDetails/${order.operation}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex' }}>
                    <Grid container spacing={1} key={`${index}-${itemIndex}`} sx={{mt:1}}>
                      <GridItem xs={2} text={order.operation} />
                      <GridItem xs={3} text={item.entityProduct.nameProduct} />
                      <GridItem xs={2} text={getStatusText(item.status)} style={getStatusStyle(item.status)} />
                      <GridItem xs={2} text={format(parseISO(order.createentityOrderDetail), 'MMM dd, yyyy')} />
                      <GridItem xs={1} text={`$${order.totalOrder}`} />
                      <Grid xs={1} sx={{backgroundColor: '#fff', borderRadius:2}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '100%'}}>
                          <IconButton aria-label="delete" size="small" color="primary"><ArrowForwardIcon /></IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Link>
                ))
              ))
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

