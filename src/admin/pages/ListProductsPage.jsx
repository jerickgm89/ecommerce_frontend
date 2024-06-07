import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminLayout } from '../layout/AdminLayout'
import { Box, Typography, IconButton, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetProductsQuery, useUnlockProductMutation } from '../../store/api'
import Swal from 'sweetalert2'
//import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'


export const ListProductsPage = () => {

    const { data: products = [], error, isLoading, refetch } = useGetProductsQuery()
    const [unlockProduct] = useUnlockProductMutation()
    const navigate = useNavigate()

    if (isLoading) {
        return (                            
            <Box
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh"
            >
                <CircularProgress />
                <Typography
                    variant="h6" 
                    component="div" 
                    sx={{ ml: 2 }}
                >
                    Cargando...
                </Typography>
            </Box>
        )               
    }

    const handleDelete = async (id) => {
        try {
            await unlockProduct(id)
                .unwrap()
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto bloqueado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(function(){
                        navigate('/admin');
                    }, 2000);
                })
                .catch(error => {
                    console.log(error)
                })
            refetch()
        } catch (error) {
            console.error('Failed to delete the product:', error)
        }
    }

    const handleEdit = (product) => {
        console.log('Edit product', product.idProduct)
        console.log(product);
        navigate(`/admin/editProducts/${product.idProduct}`)
    }

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 90, flex: 1},
        {field: 'image', headerName: 'Imagen', minWidth: 100, flex: 1, renderCell: (params) => {
            return <img src={params.value} alt='product' style={{width: '50px', height: '50px'}} />
        }},
        {field: 'name', headerName: 'Nombre', minWidth: 150, flex: 1},
        {field: 'price', headerName: 'Precio', minWidth: 150, flex: 1},
        {field: 'stock', headerName: 'Stock', minWidth: 150, flex: 1},
        {field: 'actions', headerName: 'Acciones', minWidth: 100, flex: 1, renderCell: (params) => {
            const product = products.find(p => p.idProduct === params.id)
            return (
                <>
                    <IconButton onClick={() => handleEdit(product)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <BlockIcon />
                    </IconButton>
                </>
            );
        }},
    ]

    const rows = products.map(product => {
        return {
            id: product.idProduct,
            image: product.imageProducts,
            name: product.nameProduct,
            price: product.priceProduct,
            stock: product.stockProduct,
        }
    })

    console.log(rows);

    return (
        <AdminLayout>
            <Typography variant='h4'>
                Lista de Productos Activos
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
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'desc' }],
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </AdminLayout>
    )
}