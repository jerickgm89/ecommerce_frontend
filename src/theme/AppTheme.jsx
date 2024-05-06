import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { themeEcommerce } from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={themeEcommerce}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
