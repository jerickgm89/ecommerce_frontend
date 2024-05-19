import React, { useEffect, useState } from 'react'
import { useGetProductByIdQuery } from '../../store/api/ecommerceApi'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useUpdateProductsMutation } from '../../store/api/ecommerceApi'
import * as yup from 'yup'

const validationSchema = yup.object({
    name: yup
        .string()
        .required('El nombre es requerido'),
    price: yup
        .string()
        .matches(/^[0-9]+(?:\.[0-9]+)?$/, 'El precio debe ser un numero decimal')
        .required('El precio es requerido'),
	year: yup
		.string()
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
        .string()
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
        imageProducts: '',
        model: '',
        color: '',
        size: '',
        idBrand: '',
    })
    console.log(product?.nameProduct)
    console.log(product)

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
            alert(JSON.stringify(values, null, 2));
  
            // const formData = new FormData();
            // formData.append('Products[nameProduct]', values.name);
            // formData.append('Products[priceProduct]', values.price);
            // formData.append('Products[yearProduct]', values.year);
            // formData.append('Products[stockProduct]', values.stock);
            // formData.append('Products[SKU]', values.sku);
            // formData.append('Products[descriptionProduct]', values.description);
            // formData.append('Products[idReview]', values.idReview);
            // formData.append('Products[idCategory]', values.idCategory);
            // formData.append('Products[IdDiscount]', values.idDiscount);
            // formData.append('Products[imageProducts]', values.imageProducts);
            // formData.append('Variants[modelProduct]', values.model);
            // formData.append('Variants[characteristics]', JSON.stringify({
            //     color: values.color,
            //     size: values.size,
            // }));
            // formData.append('Variants[idBrand]', values.idBrand)
            // console.log(formData)
            const updatedProduct = {
                id,
                Products: {
                    nameProduct: formik.values.name,
                    priceProduct: formik.values.price,
                    imageProducts: formik.values.imageProducts,
                    yearProduct: formik.values.year,
                    descriptionProduct: formik.values.description,
                    SKU: formik.values.sku,
                    stockProduct: formik.values.stock,
                    idReview: formik.values.idReview,
                    idCategory: formik.values.idCategory,
                    idDiscount: formik.values.idDiscount
                },
                Variants: {
                    modelProduct: formik.values.modelProduct,
                    characteristics: {
                        color: formik.values.color,
                        size: formik.values.size
                    },
                    idBrand: formik.values.idBrand,
                }
            }
            console.log(updatedProduct)
            await updateProduct(updatedProduct)
            refetch()
        },
    })

    if (isLoading) {
        return <p>Cargando...</p>
    }

    if (error) {
        return <p>Ocurrió un error: {error.message}</p>
    }

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginTop: 30, marginBottom: 30, mx: 'auto', maxWidth: 600, border: '1px solid black', padding: 30, borderRadius: '5px' }} encType="multipart/form-data">
			<Typography sx={{ textAlign: 'center'}}>
				{`ACTUALIZAR PRODUCTO CON ID: ${id}`}
			</Typography>

            <Grid container>

                <Grid item xs={12} sx={{ mt: 2}}>
                    <TextField
                        name="name"
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
                    <TextField 
					    name="idCategory"
					    type="number" 
                        value={formik.values.idCategory}
					    placeholder="Ingrese el ID de la categoria" 
					    fullWidth
					    onChange={formik.handleChange}
					    onBlur={formik.handleBlur}
					    error={formik.touched.idCategory && Boolean(formik.errors.idCategory)}
					    helperText={formik.touched.idCategory && formik.errors.idCategory}
				    />
                </Grid>

			    <Grid item xs={12} sx={{ mt: 2}}>
                    <TextField 
					    name="idDiscount"
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
					    type="text" 
                        value={formik.values.description}
					    placeholder="Ingrese la descripcion del producto" 
					    fullWidth
					    onChange={formik.handleChange}
					    onBlur={formik.handleBlur}
					    error={formik.touched.description && Boolean(formik.errors.description)}
					    helperText={formik.touched.description && formik.errors.description}
				    />
                </Grid>
                <br />
  			    <Typography sx={{ textAlign: 'center'}}>
			        Catacterísticas:
			    </Typography>

                <Grid item xs={12} sx={{ mt: 2}}>
                    <TextField 
              	        name="model" 
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
                    <TextField 
              	        name="idBrand"
                        type="number"
                        value={formik.values.idBrand}
                        placeholder="Ingrese el ID de la marca"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.idBrand && Boolean(formik.errors.idBrand)}
                        helperText={formik.touched.idBrand && formik.errors.idBrand}
                    />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2}}>
                    <TextField 
              	        name="imageProducts"
                        type="text"
                        value={formik.values.imageProducts}
                        placeholder="Ingrese la imagen del producto"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.imageProducts && Boolean(formik.errors.imageProducts)}
                        helperText={formik.touched.imageProducts && formik.errors.imageProducts}
                    />
                </Grid>

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
    )    
}