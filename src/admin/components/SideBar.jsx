import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Collapse, Typography } from '@mui/material';
import { Checklist, Create, ExpandLess, ExpandMore, MoveToInbox as InboxIcon } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const SideBar = ({drawerWith, handleDrawerToggle}) => {

  const [open, setOpen] = useState(false)
  const [openUsers, setOpenUsers] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickUsers = () => {
    setOpenUsers(!openUsers)
  }
  
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
                      <ListItemText primary="Lista de Productos Activos" />                  
                    </ListItemButton>
                  </Link>
                  {/* Item 2 */}
                  <Link to='/admin/lockedProducts' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon sx={{}}>
                        <Checklist color='icon'/>
                      </ListItemIcon>                    
                      <ListItemText primary="Lista de Productos Bloqueados" />                  
                    </ListItemButton>
                  </Link>
                  {/* Item 3 */}
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

            <List>

              <ListItemButton onClick={handleClickUsers}>
                <ListItemIcon>
                  <GroupIcon color='icon' />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
                {
                  openUsers ? <ExpandLess /> : <ExpandMore />
                }
              </ListItemButton>

              <Collapse 
                in={openUsers} 
                timeout="auto" 
                unmountOnExit
              >
                <List 
                  component="div"
                >
                  {/* Item 1 */}
                  <Link to='/admin/users' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon sx={{}}>
                        <Checklist color='icon'/>
                      </ListItemIcon>                    
                      <ListItemText primary="Lista de Usuarios Activos" />                  
                    </ListItemButton>
                  </Link>
                  {/* Item 2 */}
                  <Link to='/admin/lockedUsers' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon sx={{}}>
                        <Checklist color='icon'/>
                      </ListItemIcon>                    
                      <ListItemText primary="Lista de Usuarios Bloqueados" />                  
                    </ListItemButton>
                  </Link>
                  {/* Item 3 */}
                  <Link to='/admin/postUsers' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <PersonAddAltIcon color='icon'/>
                      </ListItemIcon>
                      <ListItemText primary="Crear Usuario" />
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