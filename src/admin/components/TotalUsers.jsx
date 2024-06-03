import { useGetUsersQuery } from "../../store/api";
import { Typography, Paper, Box, Avatar } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';

export const TotalUsers = () => {
    const { data: users } = useGetUsersQuery();

    const total = Array.isArray(users) ? users.length : 0;

    return (
        <Box mb={2}>
            <Paper elevation={3} style={{ padding: '16px', borderRadius:'30px', display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: '#3f51b5', marginRight: '16px' }}>
                    <GroupIcon />
                </Avatar>
                <Box>
                    <Typography variant="h6">Usuarios registrados</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{total}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};

