import { useState, useEffect } from "react";
import { Button, Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider  } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useCreateProductsMutation, useGetCategoriesQuery, useGetBrandsQuery } from "../../store/api";
import  CreateCategoryModal  from "./CreateCategoryModal";
import  CreateBrandModal  from "./CreateBrandModal";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const validationSchema = yup.object({
    name: yup
        .string()
        .required('El nombre es requerido'),
        // .matches(/^[A-Z][a-zA-Z]*$/, 'La primera letra debe ser mayúscula'),
    price: yup
        .string()
        .matches(/^[0-9]+(\.[0-9]+)?$/, 'El precio debe ser un numero')
        .required('El precio es requerido'),
	year: yup
        .number()
        .typeError('El año debe ser un número')
        .positive('El año debe ser un número positivo')
        .integer('El año debe ser un número entero')
        .test('len', 'El año debe tener exactamente 4 dígitos (yyyy)', val => val && val.toString().length === 4)
        .min(2000, 'El año no puede ser menor que el año 2000')
        .max(new Date().getFullYear(), `El año no puede ser mayor que ${new Date().getFullYear()}`)
        .required('El año es requerido'),
    stock: yup
        .string()
        .matches(/^\d+$/, 'El stock debe ser un numero entero')
        .required('El stock es requerido'),
    sku: yup
        .string()
        .required('El SKU es requerido'),
    idReview: yup
        .string()
        .matches(/^\d+$/, 'El ID del review debe ser un numero entero'),
    idCategory: yup
        .string()
        .matches(/^\d+$/, 'El ID de la categoría debe ser un numero entero')
        .required('El ID de la categoría es requerido'),
	idDiscount: yup
        .string()
        .matches(/^\d+$/, 'El ID del descuento debe ser un numero entero'),
	description: yup
        .string(),
    imageProducts: yup
        .object()
        .shape({
            file: yup.mixed().required('Se requiere una imagen')
        })
        .required('Se requiere una imagen'),
    model: yup
        .string()
        .required('El modelo es requerido'),
    color: yup
        .string()
        .required('El color es requerido'),
    size: yup
        .string()
        .required('El tamaño es requerido'),
    idBrand: yup
        .string()
        .matches(/^\d+$/, 'El ID de la marca debe ser un numero entero')
        .required('El ID de la marca es requerida'),
});

export const CreateProducts = () => {

    const [createProduct] = useCreateProductsMutation();
  
    const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useGetCategoriesQuery();
    const { data: brands, isLoading: brandsLoading, refetch: refetchBrands } = useGetBrandsQuery();

    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openBrandModal, setOpenBrandModal] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        // Refrescar marcas después de crear una nueva
        if (openBrandModal === false) {
            refetchBrands();
        }
    }, [openBrandModal, refetchBrands]);

    useEffect(() => {
        // Refrescar categorías después de crear una nueva
        if (openCategoryModal === false) {
            refetchCategories();
        }
    }, [openCategoryModal, refetchCategories]);


    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
		    year: '',
            stock: '',
            sku: '',
		    idReview: '',
		    idCategory: '',
		    idDiscount: '',
		    description: '',
            imageProducts: { file: null },
            model: '',
            color: '',
            size: '',
            idBrand: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('Products[nameProduct]', values.name);
            formData.append('Products[priceProduct]', values.price);
            formData.append('Products[yearProduct]', values.year);
            formData.append('Products[stockProduct]', values.stock);
            formData.append('Products[SKU]', values.sku);
            formData.append('Products[descriptionProduct]', values.description);
            formData.append('Products[idReview]', values.idReview);
            formData.append('Products[idCategory]', values.idCategory);
            formData.append('Products[IdDiscount]', values.idDiscount);
            formData.append('imageProducts', values.imageProducts.file);
            formData.append('Variants[modelProduct]', values.model);
            formData.append('Variants[characteristics]', JSON.stringify({
                color: values.color,
                size: values.size,
            }));
            formData.append('Variants[idBrand]', values.idBrand);
            console.log(formData);
            createProduct(formData)
                .unwrap()
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto creado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(function(){
                        navigate('/admin/');
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log(error)
                })
        },
    });

    return (
    <>
    <form onSubmit={formik.handleSubmit} style={{ marginTop: 30, marginBottom: 30, mx: 'auto', maxWidth: 600, border: '1px solid black', padding: 30, borderRadius: '5px' }} encType="multipart/form-data">
        <Typography sx={{ textAlign: 'center'}}>
          Agregar nuevos productos
        </Typography>

        <Grid container>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField
                    name="name"
                    label="Nombre"
                    type="text" 
                    placeholder="Ingrese el nombre del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="price"
                    label="Precio"
                    type="number"
                    placeholder="Ingrese el precio del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
            </Grid>

			<Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="year"
                    label="Año"
                    type="number"
                    placeholder="Ingrese el año del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                />
            </Grid>

			<Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="sku"
                    label="SKU" 
                    type="text" 
                    placeholder="Ingrese el SKU del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sku && Boolean(formik.errors.sku)}
                    helperText={formik.touched.sku && formik.errors.sku}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField
                    name="stock"
                    label="Stock"
                    type="number"
                    placeholder="Ingrese el stock del producto"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                />
            </Grid>

			<Grid item xs={12} sx={{ mt: 2}}>
                <TextField
                    name="idReview"
                    label="ID Review"
                    type="number" 
                    placeholder="Ingrese el ID del review" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.idReview && Boolean(formik.errors.idReview)}
                    helperText={formik.touched.idReview && formik.errors.idReview}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <FormControl fullWidth>
                    <InputLabel id="category-label">Categoría</InputLabel>
                        <Select
                            labelId="category-label"
                            id="idCategory"
                            name="idCategory"
                            value={formik.values.idCategory}
                            label="Categoría"
                            onChange={formik.handleChange}
                            error={formik.touched.idCategory && Boolean(formik.errors.idCategory)}
                        >
                            {categoriesLoading ? (
                                <MenuItem value="">
                                    <CircularProgress size={18} />
                                    Cargando categorías...
                                </MenuItem>
                            ) : (
                                categories.map((category) => (
                                    <MenuItem key={category.idCategory} value={category.idCategory}>
                                        {category.nameCategory}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                </FormControl>
                <Button onClick={() => setOpenCategoryModal(true)}>Crear nueva categoría</Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="idDiscount"
                    label="ID Descuento"
                    type="number" 
                    placeholder="Ingrese el ID del descuento" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.idDiscount && Boolean(formik.errors.idDiscount)}
                    helperText={formik.touched.idDiscount && formik.errors.idDiscount}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="description" 
                    label="Descripción"
                    type="text" 
                    placeholder="Ingrese la descripcion del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 0, 0, 0.2)' }} />
            </Grid>
            

            <Typography sx={{ textAlign: 'center'}}>
                Características:
            </Typography>
            

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="model" 
                    label="Modelo"
                    type="text" 
                    placeholder="Ingrese el modelo del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                    helperText={formik.touched.model && formik.errors.model}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="color" 
                    label="Color"
                    type="text" 
                    placeholder="Ingrese el color del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.color && Boolean(formik.errors.color)}
                    helperText={formik.touched.color && formik.errors.color}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <TextField 
                    name="size" 
                    label="Tamaño"
                    type="text" 
                    placeholder="Ingrese el tamaño del producto" 
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.size && Boolean(formik.errors.size)}
                    helperText={formik.touched.size && formik.errors.size}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="brand-label">Marca</InputLabel>
                    <Select
                        labelId="brand-label"
                        id="idBrand"
                        name="idBrand"
                        value={formik.values.idBrand}
                        label="Marca"
                        onChange={formik.handleChange}
                        error={formik.touched.idBrand && Boolean(formik.errors.idBrand)}
                    >
                        {brandsLoading ? (
                            <MenuItem value="">
                                <CircularProgress size={18} />
                                Cargando marcas...
                             </MenuItem>
                        ) : (
                            brands.map((brand) => (
                                <MenuItem key={brand.idBrand} value={brand.idBrand}>
                                    <img src={brand.logoBrand} alt={brand.nameBrand} style={{ width: 20, marginRight: 10 }} />
                                    {brand.nameBrand}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
                <Button onClick={() => setOpenBrandModal(true)}>Crear nueva marca</Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2}}>
                <input
                accept="image/*"
                id="contained-button-file"
                name="imageProducts"                              // Este nombre debe coincidir con el esperado por Multer
                type="file"
                onChange={(event) => {
                    formik.setFieldValue("imageProducts", { file: event.currentTarget.files[0] });
                }}
                onBlur={formik.handleBlur}
                style={{ display: "none" }}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" fullWidth>
                        Cargar imagen
                    </Button>
                </label>
                {formik.touched.imageProducts && formik.errors.imageProducts?.file && (
                    <Typography color="error">{formik.errors.imageProducts.file}</Typography>
                )}
            </Grid>

			<Grid item xs={12} sx={{ mt: 2}}>
                <Button 
                    variant='contained' 
                    fullWidth
                    type="submit"
                >
                    Crear producto
                </Button>
            </Grid>

        </Grid>
    </form>

    <CreateCategoryModal open={openCategoryModal} handleClose={() => setOpenCategoryModal(false)} />
    <CreateBrandModal open={openBrandModal} handleClose={() => setOpenBrandModal(false)} />
    </>   
    )
}