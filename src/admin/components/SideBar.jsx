import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Collapse, Typography } from '@mui/material';
import { Checklist, Create, ExpandLess, ExpandMore, MoveToInbox as InboxIcon } from '@mui/icons-material';

export const SideBar = ({drawerWith, handleDrawerToggle}) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
  
    
  return (
    <Box sx={{ display: 'flex', }}>
      <Box
        component="nav"
        sx={{ 
          width: { 
            sm: `${drawerWith}px` 
          }, 
          flexShrink: { 
            sm: 0 } 
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { 
              xs: 'none', sm: 'block' 
            },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: `${drawerWith}px` 
            },
          }}
          open
        >
            <Toolbar>
                <Typography 
                  variant='h6' 
                  noWrap
                >
                    Admin Ecommerce
                </Typography>
            </Toolbar>

            <Divider />

            <List>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon color='icon'/>
                </ListItemIcon>
                <ListItemText primary="Productos" />
                {
                  open ? <ExpandLess /> : <ExpandMore />
                }
              </ListItemButton>

              <Collapse 
                in={open} 
                timeout="auto" 
                unmountOnExit
              >
                <List 
                  component="div"
                >
                  {/* Item 1 */}
                  <Link to='/admin/' style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon sx={{}}>
                      <Checklist color='icon'/>
                    </ListItemIcon>                    
                      <ListItemText primary="Lista de Productos" />                  
                  </ListItemButton>
                  </Link>
                  {/* Item 2 */}
                  <Link to='/admin/createProducts' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <Create color='icon'/>
                      </ListItemIcon>
                      <ListItemText primary="Crear Producto" />
                    </ListItemButton>
                  </Link>

                </List>
              </Collapse>

            </List>           
        </Drawer>
      </Box>
    </Box>
  )
}
