import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetProductByIdQuery, useUpdateProductsMutation, useGetCategoriesQuery, useGetBrandsQuery} from '../../store/api/ecommerceApi'
import { Button, Grid, TextField, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import  CreateCategoryModal  from "./CreateCategoryModal"
import  CreateBrandModal  from "./CreateBrandModal"
import { useFormik } from 'formik'
import * as yup from 'yup'
import Swal from 'sweetalert2'

const validationSchema = yup.object({
    name: yup
        .string()
        .required('El nombre es requerido'),
    price: yup
        .string()
        .matches(/^[0-9]+(?:\.[0-9]+)?$/, 'El precio debe ser un numero decimal')
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
        .matches(/^[0-9]+$/, 'El precio debe ser un numero decimal')
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
        .mixed()
        .test('fileType', 'Formato de archivo no soportado', value => {
            if (typeof value === 'string') {
                return true
            }
            if (value && value.file instanceof File) {
                return ['image/jpeg', 'image/png', 'image/gif'].includes(value.file.type)
            }
            return false
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


export const EditProducts = ({ id }) => {

    const { data: product, error, isLoading, refetch } = useGetProductByIdQuery(id)
    const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useGetCategoriesQuery()
    const { data: brands, isLoading: brandsLoading, refetch: refetchBrands } = useGetBrandsQuery()
    const navigate = useNavigate()

    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openBrandModal, setOpenBrandModal] = useState(false);

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


    const [initialValues, setInitialValues] = useState({
        name: '',
        price: '',
        year: '',
        stock: '',
        sku: '',
        idReview: '',
        idCategory: '',
        idDiscount: '',
        description: '',
        imageProducts: '' /*|| { file: null }*/,
        model: '',
        color: '',
        size: '',
        idBrand: '',
    })

    const [updateProduct] = useUpdateProductsMutation()

    useEffect(() => {
        if (product?.nameProduct) {
            setInitialValues({
                name: product.nameProduct || '',
                price: product.priceProduct || '',
                year: product.yearProduct || '',
                stock: product.stockProduct || '',
                sku: product.SKU || '',
                idReview: product.idReview || '',
                idCategory: product.idCategory || '',
                idDiscount: product.idDiscount || '',
                description: product.descriptionProduct || '',
                imageProducts: product.imageProducts || '',
                model: product.characteristicsProduct?.modelProduct || '',
                color: 'gris plata',
                size: '7"',
                idBrand: product.characteristicsProduct?.idBrand || '',
            });
        }
    }, [product]);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true, // Permite que formik se reinicialice con los nuevos valores iniciales
        validationSchema: validationSchema,
        onSubmit: async(values) => {
            console.log(values)
            const formData = new FormData();
            formData.append('id', id);
            formData.append('Products[nameProduct]', values.name);
            formData.append('Products[priceProduct]', values.price);
            formData.append('Products[yearProduct]', values.year);
            formData.append('Products[stockProduct]', values.stock);
            formData.append('Products[SKU]', values.sku);
            formData.append('Products[descriptionProduct]', values.description);
            formData.append('Products[idReview]', values.idReview);
            formData.append('Products[idCategory]', values.idCategory);
            formData.append('Products[IdDiscount]', values.idDiscount);
            if (values.imageProducts.file instanceof File) {
                formData.append('imageProducts', values.imageProducts.file);
            } else {
                formData.append('Products[imageProducts]', values.imageProducts);
            }
            formData.append('Variants[modelProduct]', values.model);
            formData.append('Variants[characteristics]', JSON.stringify({
                color: values.color,
                size: values.size,
            }));
            formData.append('Variants[idBrand]', values.idBrand)
            console.log(formData)
            await updateProduct(formData)
                .unwrap()
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto actualizado',
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
            //refetch()
        },
    })

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>Ocurrió un error: {error.message}</p>
    }

    return (
        <>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: 30, marginBottom: 30, mx: 'auto', maxWidth: 600, border: '1px solid black', padding: 30, borderRadius: '5px' }} encType="multipart/form-data">
			<Typography sx={{ textAlign: 'center'}}>
				{`ACTUALIZAR PRODUCTO CON ID: ${id}`}
			</Typography>

            <Grid container>

                <Grid item xs={12} sx={{ mt: 2}}>
                    <TextField
                        name="name"
                        label="Nombre"
                        type="text"
                        value={formik.values.name} 
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
                        type="text"
                        value={formik.values.price} 
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
					    type="text" 
                        value={formik.values.year}
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
                        value={formik.values.sku}
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
                        value={formik.values.stock}
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
                        value={formik.values.idReview}
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
                                <MenuItem value="">Cargando categorías...</MenuItem>
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
                        value={formik.values.idDiscount}
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
                        value={formik.values.description}
					    placeholder="Ingrese la descripcion del producto" 
					    fullWidth
					    onChange={formik.handleChange}
					    onBlur={formik.handleBlur}
					    error={formik.touched.description && Boolean(formik.errors.description)}
					    helperText={formik.touched.description && formik.errors.description}
                        
				    />
                    <Divider style={{ margin: '16px 0', borderColor: 'rgba(0, 0, 0, 0.2)' }} />
                </Grid>
                <br />
  			    <Typography sx={{ textAlign: 'center'}}>
			        Características:
			    </Typography>

                <Grid item xs={12} sx={{ mt: 2}}>
                    <TextField 
              	        name="model"
                        label="Modelo" 
                        type="text" 
                        value={formik.values.model}
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
                        value={formik.values.color}
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
                        value={formik.values.size}
                        placeholder="Ingrese el tamaño del producto" 
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.size && Boolean(formik.errors.size)}
                        helperText={formik.touched.size && formik.errors.size}
                    />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2}}>
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
                                        <MenuItem value="">Cargando marcas...</MenuItem>
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
                    <TextField 
              	        name="imageProducts"
                        label="Imagen"
                        type="text"
                        value={formik.values.imageProducts}
                        //value={formik.values.imageProducts && typeof formik.values.imageProducts === 'string' ? formik.values.imageProducts : ''}
                        placeholder="Ingrese la imagen del producto"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.imageProducts && Boolean(formik.errors.imageProducts)}
                        helperText={formik.touched.imageProducts && formik.errors.imageProducts}
                    />
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
                    {formik.touched.imageProducts && formik.errors.imageProducts && (
                        <Typography color="error">{formik.errors.imageProducts}</Typography>
                    )}
                </Grid>

                {/* <Grid item xs={12} sx={{ mt: 2}}>
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
                    {formik.touched.imageProducts && formik.errors.imageProducts && (
                        <Typography color="error">{formik.errors.imageProducts}</Typography>
                    )}
                </Grid> */}

			    <Grid item xs={12} sx={{ mt: 2}}>
                    <Button 
                        variant='contained' 
                        fullWidth
                        type="submit"
                    >
                        Actualizar producto
                    </Button>
                </Grid>

            </Grid>
        </form>

        <CreateCategoryModal open={openCategoryModal} handleClose={() => setOpenCategoryModal(false)} />
        <CreateBrandModal open={openBrandModal} handleClose={() => setOpenBrandModal(false)} />

        </>
    )    
}