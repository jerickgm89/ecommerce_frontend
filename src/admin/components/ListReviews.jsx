import { Box, Typography, IconButton, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetDeactivedReviewsQuery } from '../../store/api/ecommerceReviewApi'
import { useGetProductsQuery } from '../../hooks/useGetProductsByIdsQuery'
import { useRestoreReviewMutation } from '../../store/api/ecommerceReviewApi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setReviewsCount } from '../../store/adminNotifications/notificationsSlice'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Swal from 'sweetalert2'

export const ListReviews = () => {

    const { data: reviews = [], error, isLoading, refetch } = useGetDeactivedReviewsQuery()
    const idProductReview = [...new Set(reviews.map(review => review.idProduct))]
    const { data: products = [], error: errorProduct, isLoading: isLoadingProduct } = useGetProductsQuery(idProductReview)
    const [restoreReview] = useRestoreReviewMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const count = reviews.length;
        dispatch(setReviewsCount(count))
        refetch()
    }, [reviews])

    if (isLoading) {
        return (                            
            <Box
                display="flex" 
                justifyContent="left" 
                alignItems="center" 
                height="100vh"
                sx={{ mt: -12 }}
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

    const handleRestore = async(id) => {
        await restoreReview(id)
            .unwrap()
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reseña publicada',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function(){
                    navigate('/admin/reviews')
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
        refetch()
    }

    const columns = [
        {field: 'id', headerName: 'ID', maxWidth: 80, flex: 1},
        {field: 'description', headerName: 'Reseña', minWidth: 150, flex: 1},
        {field: 'score', headerName: 'Puntuación', minWidth: 150, flex: 1},
        {
            field: 'productImage', 
            headerName: 'Imagen del Producto', 
            maxWidth: 150, 
            flex: 1, 
            renderCell: (params) => {
                const product = products.find(p => p.idProduct === params.row.productId);
                if (product) {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={product.imageProducts[0]} alt={product.nameProduct} style={{width: '50px', height: '50px'}}/>
                        </div>
                    );
                } else {
                    return 'Imagen no disponible';
                }
            }
        },
        {
            field: 'productName', 
            headerName: 'Nombre del Producto', 
            minWidth: 150, 
            flex: 1, 
            renderCell: (params) => {
                const product = products.find(p => p.idProduct === params.row.productId);
                return product ? product.nameProduct : 'Producto no encontrado';
            }
        },
        {field: 'acciones', headerName: 'Publicar', minWidth: 100, flex: 1, renderCell: (params) => {
            const review = reviews.find(p => p.idReview === params.id)
            return (
                <>
                    <IconButton onClick={() => handleRestore(review.idReview)}>
                        <PostAddIcon />
                    </IconButton>
                </>
            )
        }},
    ]

    const rows = reviews.map(review => {
        return {
            id: review.idReview,
            description: review.descriptionReview,
            score: review.scoreReview,
            productId: review.idProduct,
        }
    })

    return (
        <>
            <Typography variant='h4'>
                Lista de Reseñas
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
        </>
    )
}