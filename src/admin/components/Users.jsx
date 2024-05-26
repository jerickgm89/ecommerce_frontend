import { Box, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetUsersQuery, useUnlockUserMutation } from '../../store/api/ecommerceUserApi'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export const Users = () => {

    const { data: users = [], error, isLoading, refetch } = useGetUsersQuery()
    console.log(users)
    const [unlockUser] = useUnlockUserMutation()
    const navigate = useNavigate()

    const handleEdit = (user) => {
        console.log('Edit user', user.idUser)
        console.log(user);
        navigate(`/admin/updateUsers/${user.idUser}`)
    }

    const handleDelete = async (id) => {
        try {
            await unlockUser(id).unwrap();
            refetch()
        } catch (error) {
            console.error("Failed to blocked user: ", error)
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
        {field: 'actions', headerName: 'Eliminar', minWidth: 100, flex: 1, renderCell: (params) => {
            const user = users.find(p => p.idUser === params.id)
            return (
                <>
                    <IconButton onClick={() => handleEdit(user)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            );
        }},
    ]

    const rows = users.map(user => {
        return {
            id: user.idUser,
            image: user.pictureUser,
            name: user.nameUser,
            lastname: user.lastNameUser,
            email: user.emailUser,
        }
    })

    // if (isLoading) return <div>Loading...</div>
    // if (error) return <div>Error loading users</div>

    return (
        <>
            <Typography variant='h4'>
                Lista de Usuarios Activos
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