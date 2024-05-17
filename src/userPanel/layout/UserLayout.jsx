
import { Box } from '@mui/material';
import { EcommerceUI } from '../../ui';

export const UserLayout = ({children}) => {
  return (
    <EcommerceUI >
        <Box 
            sx={{
                display: 'flex',  
                flexDirection: 'column',
                height: '100vh',
                bgcolor: '#F6F9FC'
            }}
        >
            {children}
        </Box>
    </EcommerceUI>
  )
}
