import { Box, Toolbar } from '@mui/material'
import { NavbarAdmin, SideBar } from '../components'
import { useState } from 'react';

const drawerWith = 240;

export const AdminLayout = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box
      sx={{ display: 'flex'}}
    >
      <NavbarAdmin drawerWith={drawerWith} handleDrawerToggle={handleDrawerToggle}/>
      <SideBar drawerWith={drawerWith} handleDrawerToggle={handleDrawerToggle}/>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3}}
      >
          <Toolbar />
          {children}
      </Box>
    </Box>
  )
}
