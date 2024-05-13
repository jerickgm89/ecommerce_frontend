
import { Box } from '@mui/material';
import { UIEcommerce } from './../../ui/UIEcommerce';

export const UserLayout = ({children}) => {
  return (
    <UIEcommerce >
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
    </UIEcommerce>
  )
}
