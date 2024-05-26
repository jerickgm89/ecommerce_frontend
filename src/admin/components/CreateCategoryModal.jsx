import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "../../store/api";
import * as yup from 'yup';
import { useFormik } from 'formik';

const CreateCategoryModal = ({ open, handleClose }) => {
    const [createCategory] = useCreateCategoryMutation();
    const { data: categories } = useGetCategoriesQuery();

    const validationSchema = yup.object({
        nameCategory: yup.string()
            .required('El nombre de la categoría es requerido')
            .test('uniqueName', 'Ya existe una categoría con este nombre', function(value) {
                // Verificar si ya existe una categoría con el mismo nombre
                return !categories.some(category => category.nameCategory === value);
            })
            .matches(/^[A-Z][a-zA-Z]*$/, 'La primera letra debe ser mayúscula'),
        descriptionCategory: yup.string().required('La descripción de la categoría es requerida'),
    });

    const formik = useFormik({
        initialValues: {
            nameCategory: '',
            descriptionCategory: '',
            imageCategory: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('nameCategory', values.nameCategory);
                formData.append('descriptionCategory', values.descriptionCategory);
                if (values.imageCategory) {
                    formData.append('imageCategory', values.imageCategory);
                }
                await createCategory(formData);
                handleClose();
            } catch (error) {
                console.error('Error creando la categoría:', error);
            }
        },
    });

    const handleFileChange = (event) => {
        formik.setFieldValue('imageCategory', event.currentTarget.files[0]);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crear Nueva Categoría</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor, ingresa el nombre y la descripción de la nueva categoría.
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginTop: 20 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={formik.handleSubmit}>Crear</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCategoryModal;
