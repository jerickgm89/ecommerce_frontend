import { useState } from "react";
import { Box, Button, Rating, TextField, Typography } from "@mui/material"
import { Star as StarIcon} from "@mui/icons-material";
import { useFormik } from "formik"
import * as yup from 'yup'
import Swal from 'sweetalert2'
import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi"
import { useParams } from "react-router-dom"


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
    review: yup
        .string()
        .required('La reseña es requerida'),
});

const TOKEN = localStorage.getItem('token');
  
export const AddNewReview = () => {

    const [value, setvalue] = useState(2)
    const [hover, setHover] = useState(-1)
    const puntaje = value;
    console.log('puntaje ' + puntaje);

    const { data: userData, error, isLoading } = useGetUserByTokenQuery(TOKEN);
    console.log(userData);

    const { id } = useParams();
    const idProduct = id;
    console.log('Idproducto ' +idProduct);

    const formik = useFormik({
        initialValues: {
            idProduct: idProduct,
            idUser: userData ? userData.idUser : '',
            valueRate: 0,
            review: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            Swal.fire({
                icon: 'success',
                title: 'Reseña enviada correctamente',
                showConfirmButton: false,
                timer: 1500
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
                        formik.setFieldValue('valueRate', newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" 
                />}
                />
                {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Escribe tu reseña"
                    name="review"
                    type="text"
                    value={formik.values.review}
                    onChange={formik.handleChange}
                    error={formik.touched.review && Boolean(formik.errors.review)}
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
