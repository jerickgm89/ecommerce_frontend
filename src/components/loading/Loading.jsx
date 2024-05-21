
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Cargando...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      textAlign="center"
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>{message}</Typography>
    </Box>
  );
};

export default Loading;
