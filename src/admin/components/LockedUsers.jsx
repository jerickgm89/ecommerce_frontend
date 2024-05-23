import { Box, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetUsersBlockedQuery } from '../../store/api/ecommerceUserApi'
import { useRestoreUserMutation } from '../../store/api/ecommerceUserApi'
import RestoreIcon from '@mui/icons-material/Restore'

export const LockedUsers = () => {

    const { data: usersLocked = [], error, isLoading } = useGetUsersBlockedQuery()
    console.log(usersLocked)
    const [restoreUser] = useRestoreUserMutation()

    const handleRestore = (id) => {
        restoreUser(id)
    }

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 90, flex: 1},
        {field: 'image', headerName: 'Imagen', minWidth: 100, flex: 1, renderCell: (params) => {
            return <img src={params.value} alt='product' style={{width: '50px', height: '50px'}} />
        }},
        {field: 'name', headerName: 'Nombres', minWidth: 150, flex: 1},
        {field: 'lastname', headerName: 'Apellidos', minWidth: 150, flex: 1},
        {field: 'email', headerName: 'Email', minWidth: 150, flex: 1},
        {field: 'actions', headerName: 'Restaurar', minWidth: 100, flex: 1, renderCell: (params) => {
            //const user = usersLocked.find(p => p.idUser === params.id)
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