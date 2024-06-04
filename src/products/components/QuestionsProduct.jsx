import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi"
import { usePostCreateQuestionMutation } from "../../store/api/ecommerceQuestionsApi";
import { useParams } from "react-router-dom"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

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
  // console.log(idUser);
  const idProduct = id;

  const [createQuestion, { isSuccess: successQuestion, isError: errorQuestion }] = usePostCreateQuestionMutation();
  const [questionCount, setQuestionCount] = useState(0);

  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = localStorage.getItem(`countdown-${idProduct}`);
    return savedCountdown ? Number(savedCountdown) : 0;
  });
  
  const [buttonDisabled, setButtonDisabled] = useState(() => {
    const savedCountdown = localStorage.getItem(`countdown-${idProduct}`);
    return savedCountdown ? true : false;
  });

  useEffect(() => {
    let timer;
    if (buttonDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prevCountdown => {
          const newCountdown = prevCountdown - 1;
          localStorage.setItem(`countdown-${idProduct}`, newCountdown);
          return newCountdown;
        });
      }, 1000);
    } else if (countdown === 0) {
      setButtonDisabled(false);
      localStorage.removeItem(`countdown-${idProduct}`);
    }
    return () => clearTimeout(timer);
  }, [buttonDisabled, countdown]);


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
        // console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Pregunta enviada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        resetForm();
        // Increment the question count
        setQuestionCount(prevCount => {
          const newCount = prevCount + 1;
          // Activate the countdown after the second question
          if (newCount >= 1) {
            setButtonDisabled(true);
            setCountdown(180);
            localStorage.setItem(`countdown-${idProduct}`, 180);
          }
          return newCount;
        });
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
              disabled={!formik.dirty || buttonDisabled}
            >
              Preguntar {buttonDisabled ? `(${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60})` : ''}
            </Button>
          </form>
        </Box>
      </Grid>
    </>
  )
}
