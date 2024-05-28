import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import {useUpdateCategoryMutation } from "../../store/api";
import * as yup from 'yup';
import { useFormik } from 'formik';

export const EditCategoryModal = ({ open, handleClose, category }) => {
    const [editCategory] = useUpdateCategoryMutation();

    const validationSchema = yup.object({
        nameCategory: yup.string()
            .required('El nombre de la categoría es requerido')
            .matches(/^[A-Z][a-zA-Z]*$/, 'La primera letra debe ser mayúscula'),
        descriptionCategory: yup.string().required('La descripción de la categoría es requerida'),
    });

    const formik = useFormik({
        initialValues: {
            nameCategory: category.nameCategory,
            descriptionCategory: category.descriptionCategory,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await editCategory({
                    id: category.id,
                    nameCategory: values.nameCategory,
                    descriptionCategory: values.descriptionCategory,
                });
                handleClose();
            } catch (error) {
                console.error('Error editando la categoría:', error);
            }
        },
    });

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edita el nombre y la descripción de la categoría.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre de la categoría"
                    type="text"
                    fullWidth
                    name="nameCategory"
                    value={formik.values.nameCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nameCategory && Boolean(formik.errors.nameCategory)}
                    helperText={formik.touched.nameCategory && formik.errors.nameCategory}
                />
                <TextField
                    margin="dense"
                    label="Descripción de la categoría"
                    type="text"
                    fullWidth
                    name="descriptionCategory"
                    value={formik.values.descriptionCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.descriptionCategory && Boolean(formik.errors.descriptionCategory)}
                    helperText={formik.touched.descriptionCategory && formik.errors.descriptionCategory}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={formik.handleSubmit}>Guardar Cambios</Button>
            </DialogActions>
        </Dialog>
    );
};


