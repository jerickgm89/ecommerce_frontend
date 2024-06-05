import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi"
import { usePostCreateReviewMutation } from "../../store/api/ecommerceReviewApi";
import { useState } from "react";
import { Box, Button, Rating, TextField, Typography } from "@mui/material"
import { Star as StarIcon} from "@mui/icons-material";
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'


const labels = {
    1: 'Inútil',
    2: 'Pobre',
    3: 'Ok',
    4: 'Bueno',
    5: 'Excelente',
  };
  
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

const validationSchema = yup.object({
    descriptionReview: yup
        .string()
        .required('La reseña es requerida'),
    scoreReview: yup
    .number()
    .required('El rating es requerido')
    .min(1, 'Por favor, selecciona al menos una estrella'),
});

const TOKEN = localStorage.getItem('token');
  
export const AddNewReview = ({ handleClose, productId }) => {

    const [value, setvalue] = useState(2)
    const [hover, setHover] = useState(-1)
    const puntaje = value;

    const { data: userData, error, isLoading } = useGetUserByTokenQuery(TOKEN);
    const idUser = userData ? userData.idUser : '';

    const idProduct = productId;

    const [createReview, { isSuccess, isError, error: errorReview }] = usePostCreateReviewMutation();

    const formik = useFormik({
        initialValues: {
            idProduct: idProduct,
            idUser: idUser,
            scoreReview: 0,
            descriptionReview: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            createReview(values).unwrap()
                .then(response => {
                    console.log(response);
                    handleClose();
                    Swal.fire({
                        icon: 'success',
                        title: 'Tu reseña estará visible en un plazo de 24hrs',
                        text: 'Muchas gracias por comprar nuestro producto',
                        confirmButtonText: 'Está bien'
                    })
                    resetForm();
                })

        },
    });

  return (
    <>
        <Typography variant="h5" sx={{ mt: 4, mb: 2}}> Escribe tu reseña de este producto </Typography>
        
            <Typography variant="h7" sx={{fontWeight: 'Bold', mb: 1}}> Calificación </Typography>
            <Box sx={{ display: 'flex', mb: 3, mr: 2 }}>
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setvalue(newValue);
                        formik.setFieldValue('scoreReview', newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {formik.touched.scoreReview && Boolean(formik.errors.scoreReview) && (
                    <Typography variant="body2" color="error">{formik.errors.scoreReview}</Typography>
                )}
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Escribe tu reseña"
                    name="descriptionReview"
                    type="text"
                    value={formik.values.descriptionReview}
                    onChange={formik.handleChange}
                    error={formik.touched.descriptionReview && Boolean(formik.errors.descriptionReview)}
                    multiline
                    fullWidth
                    sx={{mb: 2}}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    disabled={!formik.dirty}
                >
                    Enviar Reseña
                </Button>
            </form>
    </>
  )
}
