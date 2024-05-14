import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Collapse, Typography } from '@mui/material';
import { Checklist, Create, ExpandLess, ExpandMore, MoveToInbox as InboxIcon } from '@mui/icons-material';

export const SideBar = ({drawerWith, handleDrawerToggle}) => {

    const navigate = useNavigate();
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
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon sx={{}}>
                      <Checklist color='icon'/>
                    </ListItemIcon>
                    <ListItemText primary="Lista de Productos" />
                  </ListItemButton>
                  
                  {/* Item 2 */}
                  <ListItemButton sx={{ pl: 4 }} onClick={ () => navigate('/admin/createProducts') }>
                    <ListItemIcon>
                      <Create color='icon'/>
                    </ListItemIcon>
                    <ListItemText primary="Crear Producto" />
                  </ListItemButton>

                </List>
              </Collapse>

            </List>           
        </Drawer>
      </Box>
    </Box>
  )
}
