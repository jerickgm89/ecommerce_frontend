import { Box, Typography, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetDeactivedReviewsQuery, useGetReviewsQuery } from '../../store/api/ecommerceReviewApi'
import { useGetProductsQuery } from '../../hooks/useGetProductsByIdsQuery'
import { useBlockReviewMutation } from '../../store/api/ecommerceReviewApi'
import { setReviewsCount } from '../../store/adminNotifications/notificationsSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import BlockIcon from '@mui/icons-material/Block'
import Swal from 'sweetalert2'

export const ListReviewsPublished = () => {

    const { data: reviews = [], error, isLoading } = useGetReviewsQuery()
    const { data: reviewsDeactived = [], errorDeactives, isLoadingDeactived, refetch } = useGetDeactivedReviewsQuery()
    const idProductReview = [...new Set(reviews.map(review => review.idProduct))]
    const { data: products = [], error: errorProduct, isLoading: isLoadingProduct } = useGetProductsQuery(idProductReview)
    const [blockReview] = useBlockReviewMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const count = reviewsDeactived.length;
        dispatch(setReviewsCount(count));
        refetch()
    }, [reviewsDeactived, reviews])

    const handleBlock = async(id) => {
        await blockReview(id)
            .unwrap()
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reseña bloqueada',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function(){
                    navigate('/admin/reviews/published')
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
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
        {field: 'acciones', headerName: 'Bloquear', minWidth: 100, flex: 1, renderCell: (params) => {
            const review = reviews.find(p => p.idReview === params.id)
            return (
                <>
                    <IconButton onClick={() => handleBlock(review.idReview)}>
                        <BlockIcon style={{ color: 'red' }} />
                    </IconButton>
                </>
            );
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
                Lista de Reseñas Publicadas
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