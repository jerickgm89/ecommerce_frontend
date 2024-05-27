import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'
import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi"
import { useParams } from "react-router-dom"

const validationSchema = yup.object({
    question: yup
      .string()
      .required('La pregunta es requerida'),
});

const TOKEN = localStorage.getItem('token');


export const QuestionsProduct = () => {

  const { id } = useParams();
  const { data: userData, error, isLoading, isSuccess } = useGetUserByTokenQuery(TOKEN);
  const idUser = userData ? userData.idUser : '';
  const idProduct = id;

  const formik = useFormik({
    initialValues: {
      idProduct: idProduct,
      idUser: idUser,
      question: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {     
      alert(JSON.stringify(values, null, 2));
      Swal.fire({
        icon: 'success',
        title: 'Pregunta enviada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    },
  });
  return (
    <>
      <Grid item xs={12} sx={{mt:2}}>
        <Typography variant="h5" gutterBottom> Preguntas </Typography>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h7"> ¿Tienes alguna pregunta sobre este producto? </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="question"
              label="Escribe tu pregunta"
              type="text"
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean(formik.errors.question)}
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
