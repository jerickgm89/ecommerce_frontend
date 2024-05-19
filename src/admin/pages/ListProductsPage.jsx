import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminLayout } from '../layout/AdminLayout'
import { Box, Typography, IconButton } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useGetProductsQuery, useDeleteProductsMutation } from '../../store/api'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export const ListProductsPage = () => {

    const { data: products = [], error, isLoading } = useGetProductsQuery()

    const [deleteProduct] = useDeleteProductsMutation()

    const navigate = useNavigate()

    const handleDelete = (id) => {
        console.log('Delete product', id)
        deleteProduct(id)
    }

    const handleEdit = (product) => {
        console.log('Edit product', product.idProduct)
        console.log(product);
        navigate(`/admin/editProducts/${product.idProduct}`)
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'image', headerName: 'Imagen', width: 100, renderCell: (params) => {
            return <img src={params.value} alt='product' style={{width: '50px', height: '50px'}} />
        }},
        {field: 'name', headerName: 'Nombre', width: 150},
        {field: 'price', headerName: 'Precio', width: 150},
        {field: 'stock', headerName: 'Stock', width: 150},
        {field: 'actions', headerName: 'Acciones', width: 100, renderCell: (params) => {
            const product = products.find(p => p.idProduct === params.id)
            return (
                <>
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(product)}>
                        <EditIcon />
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
            Lista de Productos
        </Typography>
        <Box sx={{height: 650, width: '87.9%', mt:2}}>
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
    </AdminLayout>
  )
}
