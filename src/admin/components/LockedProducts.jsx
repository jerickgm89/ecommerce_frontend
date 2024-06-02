import { Box, Typography, IconButton } from '@mui/material'
import { useRestoreProductMutation, useGetProductsLockedQuery } from '../../store/api'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import RestoreIcon from '@mui/icons-material/Restore'
import Swal from 'sweetalert2'


export const LockedProducts = () => {

    const { data: productsLocked = [], error, isLoading } = useGetProductsLockedQuery()
    const [restoreProduct] = useRestoreProductMutation()
    const navigate = useNavigate()

    const handleRestore = async(id) => {
        await restoreProduct(id)
            .unwrap()
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto restaurado',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function(){
                    navigate('/admin/lockedProducts');
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 90, flex: 1},
        {field: 'image', headerName: 'Imagen', minWidth: 100, flex: 1, renderCell: (params) => {
            return <img src={params.value} alt='product' style={{width: '50px', height: '50px'}} />
        }},
        {field: 'name', headerName: 'Nombre', minWidth: 150, flex: 1},
        {field: 'price', headerName: 'Precio', minWidth: 150, flex: 1},
        {field: 'stock', headerName: 'Stock', minWidth: 150, flex: 1},
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

    const rows = productsLocked.map(product => {
        return {
            id: product.idProduct,
            image: product.imageProducts,
            name: product.nameProduct,
            price: product.priceProduct,
            stock: product.stockProduct,
        }
    })

    return (
        <>
            <Typography variant='h4'>
                Lista de Productos Bloqueados
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