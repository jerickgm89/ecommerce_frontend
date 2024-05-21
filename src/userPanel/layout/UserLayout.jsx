
import { Box, Grid } from '@mui/material';
import { EcommerceUI } from '../../ui';
import { SideBarUser } from '../components';

export const UserLayout = ({children}) => {
  return (
    <EcommerceUI >
        <Box 
            sx={{
                display: 'flex',  
                flexDirection: 'column',
                bgcolor: '#F6F9FC'
            }}
        >
          <Grid container spacing={2}>
            <SideBarUser/>
            {children}
          </Grid> 
        </Box>
    </EcommerceUI>
  )
}
