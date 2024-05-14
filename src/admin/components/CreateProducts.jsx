import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useCreateProductsMutation } from "../../store/api";

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
    images: yup
      .array()
      .of(yup.object().shape({
        file: yup.mixed()
      }))
      .required('Se requiere al menos una imagen')
      .min(1, 'Se requiere al menos una imagen'),
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
        images: [],
        model: '',
        color: '',
        size: '',
        idBrand: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));

        const product = {
          nameProduct: values.name,
          priceProduct: values.price,
          imageProducts: values.images.map(image => image.file),
          yearProduct: values.year,
          descriptionProduct: values.description,
          SKU: values.sku,
          stockProduct: values.stock,
          idReview: values.idReview,
          idCategory: values.idCategory,
          IdDiscount: values.idDiscount
        }

        const characteristics = {
          modelProduct: values.model,
          characteristics: {
            color: values.color,
            size: values.size,
          },
          idBrand: values.idBrand
        }

        const newProduct = {
          Products: product,
          Variants: characteristics,
        }
        console.log(newProduct);
        createProduct(newProduct);
      },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginTop: 30, marginBottom: 30, mx: 'auto', maxWidth: 600, border: '1px solid black', padding: 30, borderRadius: '5px' }}>
					<Typography sx={{ textAlign: 'center'}}>
						AGREGAR NUEVOS PRODUCTOS
					</Typography>

          <Grid container>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}}    
            >
              <TextField
                name="name"
                type="text" 
                placeholder="Ingrese el nombre del producto" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
                name="price"
                type="text" 
                placeholder="Ingrese el precio del producto" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
								name="year"
								type="text" 
								placeholder="Ingrese el año del producto" 
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.year && Boolean(formik.errors.year)}
								helperText={formik.touched.year && formik.errors.year}
							/>
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
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

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField
							  name="stock"
								type="number"
								placeholder="Ingrese el stock del producto"
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.stock && Boolean(formik.errors.stock)}
								helperText={formik.touched.stock && formik.errors.stock}
							/>
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField
								name="idReview"
								type="number" 
								placeholder="Ingrese el ID del review" 
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.idReview && Boolean(formik.errors.idReview)}
								helperText={formik.touched.idReview && formik.errors.idReview}
							/>
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
								name="idCategory"
								type="number" 
								placeholder="Ingrese el ID de la categoria" 
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.idCategory && Boolean(formik.errors.idCategory)}
								helperText={formik.touched.idCategory && formik.errors.idCategory}
							/>
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
								name="idDiscount"
								type="number" 
								placeholder="Ingrese el ID del descuento" 
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.idDiscount && Boolean(formik.errors.idDiscount)}
								helperText={formik.touched.idDiscount && formik.errors.idDiscount}
							/>
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
								name="description" 
								type="text" 
								placeholder="Ingrese la descripcion del producto" 
								fullWidth
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.description && Boolean(formik.errors.description)}
								helperText={formik.touched.description && formik.errors.description}
							/>
            </Grid>

  					<Typography sx={{ textAlign: 'center'}}>
						  Catacterísticas:
					  </Typography>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
              	name="model" 
                type="text" 
                placeholder="Ingrese el modelo del producto" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
              />
            </Grid>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
                name="color" 
                type="text" 
                placeholder="Ingrese el color del producto" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />
            </Grid>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
                name="size" 
                type="text" 
                placeholder="Ingrese el tamaño del producto" 
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.size && Boolean(formik.errors.size)}
                helperText={formik.touched.size && formik.errors.size}
              />
            </Grid>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <TextField 
              	name="idBrand"
                type="number"
                placeholder="Ingrese el ID de la marca"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.idBrand && Boolean(formik.errors.idBrand)}
                helperText={formik.touched.idBrand && formik.errors.idBrand}
              />
            </Grid>

            <Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => {
                  formik.setFieldValue("images", formik.values.images.concat(Array.from(event.currentTarget.files).map(file => ({ file }))));
                }}
                onBlur={formik.handleBlur}
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" fullWidth>
                  Cargar imagen
                </Button>
              </label>
              {formik.touched.images && formik.errors.images && (
                <Typography color="error">{formik.errors.images}</Typography>
              )}
            </Grid>

						<Grid
              item 
              xs={12}
              sx={{ mt: 2}} 
            >
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
    )
}