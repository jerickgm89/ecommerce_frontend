import { Box, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetUsersQuery, useUnlockUserMutation } from '../../store/api/ecommerceUserApi'
import { useNavigate } from 'react-router-dom'
import { usePutUpdateUserMutation } from '../../store/api/ecommerceUserApi'
import { useEffect, useState } from 'react'
import BlockIcon from '@mui/icons-material/Block'
import EditIcon from '@mui/icons-material/Edit'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
//import PersonIcon from '@mui/icons-material/Person'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Swal from 'sweetalert2'


export const Users = () => {
    
    const { data: users = [], error, isLoading, refetch } = useGetUsersQuery()
    const [changeRole, { isSuccess, isError, errorRole }] = usePutUpdateUserMutation()
    const [unlockUser] = useUnlockUserMutation()
    const navigate = useNavigate()
    const [localUsers, setLocalUsers] = useState([])

    useEffect(() => {
        setLocalUsers(users)
    }, [users])

    const handleEdit = (user) => {
        console.log('Edit user', user.idUser)
        console.log(user);
        navigate(`/admin/updateUsers/${user.idUser}`)
    }

    const handleDelete = async(id) => {
        try {
            await unlockUser(id).unwrap();
            refetch()
        } catch (error) {
            console.error("Failed to blocked user: ", error)
        }
    }

    const handleAdmin = async(user) => {
        const licenseAdmin = {
            isAdmin: true
        }
        await changeRole({ id:user.idUser, ...licenseAdmin })
            .unwrap()
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'El rol cambió a Administrador',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function(){
                    navigate('/admin/users');
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
        setLocalUsers(prev => prev.map(u => u.idUser === user.idUser ? { ...u, isAdmin: true } : u))
    }

    const handleUser = async(user) => {
        const licenseUser = {
            isAdmin: false
        }
        await changeRole({ id:user.idUser, ...licenseUser })
            .unwrap()
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'El rol cambió a Usuario',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function(){
                    navigate('/admin/users');
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
        setLocalUsers(prev => prev.map(u => u.idUser === user.idUser ? { ...u, isAdmin: false } : u))
    }

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 90, flex: 1},
        {field: 'image', headerName: 'Imagen', minWidth: 100, flex: 1, renderCell: (params) => {
            return <img src={params.value} alt='user' style={{width: '50px', height: '50px'}} />
        }},
        {field: 'name', headerName: 'Nombres', minWidth: 150, flex: 1},
        {field: 'lastname', headerName: 'Apellidos', minWidth: 150, flex: 1},
        {field: 'email', headerName: 'Email', minWidth: 150, flex: 1},
        {field: 'actions', headerName: 'Acciones', minWidth: 100, flex: 1, renderCell: (params) => {
            const user = users.find(p => p.idUser === params.id)
            return (
                <>
                    <IconButton onClick={() => handleEdit(user)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <BlockIcon />
                    </IconButton>
                </>
            );
        }},
        {field: 'roles', headerName: 'Roles', minWidth: 100, flex: 1, renderCell: (params) => {
            const user = localUsers.find(p => p.idUser === params.id)
            return (
                <>
                    <IconButton onClick={() => handleUser(user)} disabled={!user?.isAdmin}>
                        <VerifiedUserIcon style={{ color: user?.isAdmin ? undefined : '#38b000' }} />
                    </IconButton>
                    <IconButton onClick={() => handleAdmin(user)} disabled={user?.isAdmin}>
                        <AdminPanelSettingsIcon style={{ color: user?.isAdmin ? '#38b000' : undefined }} />
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

    return (
        <>
            <Typography variant='h4'>
                Lista de Usuarios Activos
            </Typography>
            <Box sx={{height: 650, width: '85%', mt:2}}>
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