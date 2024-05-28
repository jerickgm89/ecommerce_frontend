import { useGetProductsQuery }  from "../../hooks/useGetProductsByIdsQuery"
import { DataGrid } from '@mui/x-data-grid'
import { useGetQuestionsQuery, usePutUpdateQuestionMutation } from '../../store/api/ecommerceQuestionsApi'
import { useNavigate } from 'react-router-dom'
import {Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

export const ListQuestions = () => {

    const { data: questions = [], error, isLoading, refetch } = useGetQuestionsQuery()
    console.log(questions)
    const idProductQuestion = [...new Set(questions.map(question => question.idProduct))];
    console.log(idProductQuestion);
    const { data: products = [], error: errorProduct, isLoading: isLoadingProduct } = useGetProductsQuery(idProductQuestion);
    console.log(products);

    const columns = [
        {field: 'id', headerName: 'ID', maxWidth: 80, flex: 1},
        {field: 'comments', headerName: 'Pregunta', minWidth: 150, flex: 1},
        {
            field: 'response', 
            headerName: 'Respuesta', 
            minWidth: 150, 
            flex: 1,
            renderCell: (params) => {
                return params.value ? params.value : <span style={{ color: 'red' }}>Por contestar pregunta</span>;
            }
        },
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
        {field: 'actions', headerName: 'Eliminar', maxWidth: 150, flex: 1, renderCell: (params) => {
            const question = questions.find(p => p.idQuestion === params.id)
            return (
                <>
                    <IconButton onClick={() => handleEdit(question)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            );
        }},
    ]

    const rows = questions.map(question => {
        return {
            id: question.idComments,
            comments: question.comments,
            response: question.responseComments,
            productId: question.idProduct,
        }
    })
  return (
    <>
      <Typography variant='h4'>
                Lista de Preguntas
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
