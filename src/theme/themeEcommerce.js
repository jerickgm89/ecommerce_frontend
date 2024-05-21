import { createTheme } from "@mui/material";


export const themeEcommerce = createTheme({
    palette: {
        primary: {
            main: '#2e8fea',
        },
        secondary: {
            main: '#dc004e',
        },
        error: {
            main: '#f44336',
        },
        icon: {
            main: '#ffff',
        }
    },
    components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#2064a3',
              color: 'white',
            },
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              minWidth: '40px',
            },
          },
        },
      },

})
