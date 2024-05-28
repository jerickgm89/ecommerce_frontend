import { useGetUsersByIdsQuery }  from "../../hooks/useGetUsersByIdsQuery"
import { DataGrid } from '@mui/x-data-grid'
import { useGetQuestionsQuery, usePutUpdateQuestionMutation } from '../../store/api/ecommerceQuestionsApi'
import { useGetProductByIdQuery } from '../../store/api'
import { useNavigate } from 'react-router-dom'
import {Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

export const ListQuestions = () => {

    const { data: questions = [], error, isLoading, refetch } = useGetQuestionsQuery()
    console.log(questions)
    const idProductQuestion = [...new Set(questions.map(question => question.idProduct))];
    console.log(idProductQuestion);
    const { data: productData = [], error: errorProduct, isLoading: isLoadingProduct } = useGetProductByIdQuery(idProductQuestion);
    console.log(productData);

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 50, flex: 1},
        {field: 'comments', headerName: 'Pregunta', minWidth: 150, flex: 1},
        {field: 'actions', headerName: 'Eliminar', minWidth: 100, flex: 1, renderCell: (params) => {
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
