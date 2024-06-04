
import { useGetLastRegisteredUsersQuery } from '../../store/api';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
      margin: theme.spacing(2),
      
    },
    tableHead: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    tableRowOdd: {
      backgroundColor: theme.palette.action.hover,
    },
    tableCell: {
        textAlign: 'center',
      },
  }));

export const LastRegisteredUsers = () => {
    const classes = useStyles();
    const { data: usersData, error: usersError, isLoading: usersLoading } = useGetLastRegisteredUsersQuery();
  
    if (usersLoading) return <Typography>Loading...</Typography>;
    if (usersError) return <Typography>Error: {usersError.message}</Typography>;
  
    return (
      <Box >
        <Typography variant="h5">Últimos usuarios registrados</Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableCell}>Nombre</TableCell>
                <TableCell className={classes.tableCell}>Apellido</TableCell>
                <TableCell className={classes.tableCell}>Email</TableCell>
                <TableCell className={classes.tableCell}>Fecha de registro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.idUser} className={classes.tableRowOdd}>
                    
                  <TableCell>{user.nameUser}</TableCell>
                  <TableCell>{user.lastNameUser}</TableCell>
                  <TableCell>{user.emailUser}</TableCell>
                  <TableCell>{new Date(user.createdUser_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }