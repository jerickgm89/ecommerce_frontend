import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Collapse, Typography } from '@mui/material';
import { Checklist, Create, ExpandLess, ExpandMore, MoveToInbox as InboxIcon } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const SideBar = ({drawerWith, handleDrawerToggle}) => {

  const [open, setOpen] = useState(false)
  const [openUsers, setOpenUsers] = useState(false)
  const [openQuestions, setOpenQuestions] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickUsers = () => {
    setOpenUsers(!openUsers)
  }

  const handleClickQuestions = () => {
    setOpenQuestions(!openQuestions)
  }

  const menuItems = [
    {
      name: "Productos",
      icon: <InboxIcon color='icon'/>,
      open: open,
      handleClick: handleClick,
      subItems: [
        { name: "Lista de Productos Activos", link: "/admin/", icon: <Checklist color='icon'/> },
        { name: "Lista de Productos Bloqueados", link: "/admin/lockedProducts", icon: <Checklist color='icon'/> },
        { name: "Crear Producto", link: "/admin/createProducts", icon: <Create color='icon'/> }
      ]
    },
    {
      name: "Usuarios",
      icon: <GroupIcon color='icon'/>,
      open: openUsers,
      handleClick: handleClickUsers,
      subItems: [
        { name: "Lista de Usuarios Activos", link: "/admin/users", icon: <Checklist color='icon'/> },
        { name: "Lista de Usuarios Bloqueados", link: "/admin/lockedUsers", icon: <Checklist color='icon'/> },
        { name: "Crear Usuario", link: "/admin/postUsers", icon: <PersonAddAltIcon color='icon'/> }
      ]
    },
    {
      name: "Preguntas",
      icon: <QuestionMarkIcon color='icon'/>,
      open: openQuestions,
      handleClick: handleClickQuestions,
      subItems: [
        { name: "Lista de Preguntas", link: "/admin/questions", icon: <Checklist color='icon'/> }
      ]
    },
  ]

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

            {menuItems.map((menuItem) => (
              <List key={menuItem.name}>
                <ListItemButton onClick={menuItem.handleClick}>
                  <ListItemIcon>
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuItem.name} />
                  {
                    menuItem.open ? <ExpandLess /> : <ExpandMore />
                  }
                </ListItemButton>

                <Collapse 
                  in={menuItem.open} 
                  timeout="auto" 
                  unmountOnExit
                >
                  <List 
                    component="div"
                  >
                    {menuItem.subItems.map((subItem) => (
                      <Link to={subItem.link} style={{ textDecoration: 'none', color: 'inherit' }} key={subItem.name}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{}}>
                            {subItem.icon}
                          </ListItemIcon>                    
                          <ListItemText primary={subItem.name} />                  
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </List>
            ))}
        </Drawer>
      </Box>
    </Box>
  )
}