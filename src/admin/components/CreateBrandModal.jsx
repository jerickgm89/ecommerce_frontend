import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useCreateBrandMutation, useGetBrandsQuery } from "../../store/api";
import * as yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const CreateBrandModal = ({ open, handleClose }) => {
    const [createBrand] = useCreateBrandMutation();
    const { data: brands } = useGetBrandsQuery();

    const validationSchema = yup.object({
        nameBrand: yup.string()
            .required('El nombre de la marca es requerido')
            .test('uniqueName', 'Ya existe una marca con este nombre', function(value) {
                
                return !brands.some(brand => brand.nameBrand === value);
            })
            .matches(/^[A-Z][a-zA-Z]*$/, 'La primera letra debe ser mayúscula'),
        logoBrand: yup.mixed().required('El logo de la marca es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            nameBrand: '',
            logoBrand: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('nameBrand', values.nameBrand);
                formData.append('logoBrand', values.logoBrand);
                await createBrand(formData);
                handleClose();

                Swal.fire({
                    icon: 'success',
                    title: '¡Marca creada!',
                    text: 'La marca se ha creado exitosamente.',
                });
            } catch (error) {
                console.error('Error creando la marca:', error);
            }
        },
    });

    const handleLogoChange = (event) => {
        formik.setFieldValue('logoBrand', event.currentTarget.files[0]);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Crear Nueva Marca</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor, ingresa el nombre y el logo de la nueva marca.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre de la marca"
                    type="text"
                    fullWidth
                    name="nameBrand"
                    value={formik.values.nameBrand}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nameBrand && Boolean(formik.errors.nameBrand)}
                    helperText={formik.touched.nameBrand && formik.errors.nameBrand}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    style={{ marginTop: 20 }}
                />
                {formik.errors.logoBrand && formik.touched.logoBrand && (
                    <div style={{ color: 'red', marginTop: '8px' }}>{formik.errors.logoBrand}</div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={formik.handleSubmit}>Crear</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBrandModal;
