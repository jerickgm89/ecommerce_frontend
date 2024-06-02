import { useGetProductsQuery }  from "../../hooks/useGetProductsByIdsQuery"
import { useGetQuestionsQuery, usePutUpdateQuestionMutation } from '../../store/api/ecommerceQuestionsApi'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { setUnansweredCount } from '../../store/adminNotifications/notificationsSlice' 
import * as yup from 'yup'
import Swal from 'sweetalert2'

export const ListQuestions = () => {

    const { data: questions = [], error, isLoading, refetch } = useGetQuestionsQuery()
    // console.log(questions)
    const idProductQuestion = [...new Set(questions.map(question => question.idProduct))];
    // console.log(idProductQuestion);
    const { data: products = [], error: errorProduct, isLoading: isLoadingProduct } = useGetProductsQuery(idProductQuestion);
    // console.log(products);

    const [updateQuestion ] = usePutUpdateQuestionMutation();

    const dispatch = useDispatch();
    
    useEffect(() => {
        // Actualiza el contador de preguntas sin respuesta
        const count = questions.filter(question => !question.responseComments).length;
        dispatch(setUnansweredCount(count));
    }, [questions]);

    const validationSchema = yup.object({
        responseComments: yup
            .string()
            .required('La respuesta es requerida'),
    });

    const columns = [
        {field: 'id', headerName: 'ID', maxWidth: 80, flex: 1},
        {field: 'comments', headerName: 'Pregunta', minWidth: 150, flex: 1},
        {
            field: 'response', 
            headerName: 'Respuesta', 
            minWidth: 150, 
            flex: 1,
            renderCell: (params) => {
                const [open, setOpen] = useState(false);
                const [value, setValue] = useState(params.value);
        
                const handleOpen = () => {
                    setOpen(true);
                };
        
                const handleClose = () => {
                    setOpen(false);
                };

                const handleChange = (event) => {
                    setValue(event.target.value);
                };

                const formik = useFormik({
                    initialValues: {
                        responseComments: '',
                    },
                    validationSchema: validationSchema,
                    onSubmit: (values, { resetForm }) => {
                        // alert(JSON.stringify(values, null, 2));
                        updateQuestion({id: params.row.id, ...values}).unwrap()
                        .then(response => {
                            console.log(response);
                            resetForm();
                            handleClose();
                            Swal.fire({
                                icon: 'success',
                                title: 'Respuesta enviada correctamente',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            refetch();
                        })
                    },
                });
        
                return (
                    <div>
                        {params.value ? (
                            <Typography variant="body1">{params.value}</Typography>
                        ) : (
                            <Button color="secondary" onClick={handleOpen}>
                                Responder
                            </Button>
                        )}
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Pregunta {params.row.id}: {params.row.comments}</DialogTitle>
                            <form onSubmit={formik.handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        name="responseComments"
                                        label="Escribe tu respuesta"
                                        type="text"
                                        value={formik.values.responseComments} 
                                        onChange={formik.handleChange}
                                        error={formik.touched.responseComments && Boolean(formik.errors.responseComments)}
                                        helperText={formik.touched.responseComments && formik.errors.responseComments}
                                        multiline
                                        autoFocus 
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button color="primary" 
                                        type="submit"
                                        disabled={!formik.dirty}
                                    >
                                        Enviar
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    </div>
                );
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
        }
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