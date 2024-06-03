import { Box, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetUsersBlockedQuery, useRestoreUserMutation } from '../../store/api/ecommerceUserApi'
import { useNavigate } from 'react-router-dom'
import RestoreIcon from '@mui/icons-material/Restore'
import Swal from 'sweetalert2'

export const LockedUsers = () => {

    const { data: usersLocked = [], error, isLoading, refetch } = useGetUsersBlockedQuery()
    const [restoreUser] = useRestoreUserMutation()
    const navigate = useNavigate()

    const handleRestore = async (id) => {
        try {
            await restoreUser(id)
                .unwrap()
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario restaurado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(function(){
                        navigate('/admin/lockedUsers');
                    }, 2000);
                })
                .catch(error => {
                    console.log(error)
                })
            refetch()
        } catch (error) {
            console.error("Failed to restore user: ", error)
        }
    }

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 90, flex: 1},
        {field: 'image', headerName: 'Imagen', minWidth: 100, flex: 1, renderCell: (params) => {
            return <img src={params.value} alt='user' style={{width: '50px', height: '50px'}} />
        }},
        {field: 'name', headerName: 'Nombres', minWidth: 150, flex: 1},
        {field: 'lastname', headerName: 'Apellidos', minWidth: 150, flex: 1},
        {field: 'email', headerName: 'Email', minWidth: 150, flex: 1},
        {field: 'actions', headerName: 'Restaurar', minWidth: 100, flex: 1, renderCell: (params) => {
            return (
                <>
                    <IconButton onClick={() => handleRestore(params.id)}>
                        <RestoreIcon />
                    </IconButton>
                </>
            );
        }},
    ]

    const rows = usersLocked.map(user => {
        return {
            id: user.idUser,
            image: user.pictureUser,
            name: user.nameUser,
            lastname: user.lastNameUser,
            email: user.emailUser,
        }
    })

    return (
        <>
            <Typography variant='h4'>
                Lista de Usuarios Bloqueados
            </Typography>
            <Box sx={{height: 650, width: '87.9%', mt:2}}>
                <Box sx={{ width: '90%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </>
    )
}