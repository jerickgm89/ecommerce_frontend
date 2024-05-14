
import { Box } from '@mui/material';
import { EcommerceUI } from '../../ui';

export const UserLayout = ({children}) => {
  return (
    <EcommerceUI >
        <Box 
            sx={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%',
                bgcolor: '#F6F9FC'
        }}>
            {children}
        </Box>
    </EcommerceUI>
  )
}
