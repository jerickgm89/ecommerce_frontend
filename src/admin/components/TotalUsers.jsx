import { useGetUsersQuery } from "../../store/api";
import { Typography, Paper, Box, Avatar } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';

export const TotalUsers = () => {
    const { data: users } = useGetUsersQuery();

    const total = Array.isArray(users) ? users.length : 0;

    return (
        <Box mb={2}>
            <Paper elevation={3} style={{ backgroundColor:"#2196f3", padding: '16px', borderRadius:'30px', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: 'white', marginRight: '16px' }}>
                    <GroupIcon style={{ color: '#2196f3' }}/>
                </Avatar>
                <Box>
                    <Typography variant="h6">Usuarios registrados</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{total}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};

