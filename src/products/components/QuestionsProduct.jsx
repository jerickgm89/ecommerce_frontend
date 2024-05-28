import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi"
import { usePostCreateQuestionMutation } from "../../store/api/ecommerceQuestionsApi";
import { useParams } from "react-router-dom"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'

const validationSchema = yup.object({
  comments: yup
    .string()
    .required('La pregunta es requerida'),
});

const TOKEN = localStorage.getItem('token');
console.log(TOKEN);

export const QuestionsProduct = () => {

  const { id } = useParams();
  const { data: userData, error, isLoading: isLoadingToken } = useGetUserByTokenQuery(TOKEN);
  const idUser = userData ? userData.idUser : '';
  console.log(idUser);
  const idProduct = id;

  const [createQuestion, { isSuccess: successQuestion, isError: errorQuestion }] = usePostCreateQuestionMutation();
  
  const formik = useFormik({
    initialValues: {
      idProduct: idProduct,
      idUser: idUser,
      comments: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {     
      createQuestion(values).unwrap()
      .then(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Pregunta enviada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        resetForm();
        window.location.reload();
      })
    },
  });

  return (
    isLoadingToken ? 
    <Typography variant="h6">Cargando...</Typography> :
    <>
      <Grid item xs={12} sx={{mt:2}}>
        <Typography variant="h5" gutterBottom> Preguntas </Typography>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h7"> ¿Tienes alguna pregunta sobre este producto? </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="comments"
              label="Escribe tu pregunta"
              type="text"
              value={formik.values.comments}
              onChange={formik.handleChange}
              error={formik.touched.comments && Boolean(formik.errors.comments)}
              multiline
              fullWidth
              sx={{mt: 1, mb: 2}}
            />
            <Button
                variant="contained" 
                color="primary" 
                type="submit"
                disabled={!formik.dirty}
            >
                Preguntar
            </Button>
          </form>
        </Box>
      </Grid>
    </>
  )
}
