import { Typography, Grid, Box, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useGetCategoriesQuery } from "../../store/api";

export const CategoryProductsHome = ({ onCategoryClick, categoryId }) => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    if (isLoading) return <Typography>Cargando...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    return (
        <Grid container spacing={2} justifyContent={'center'}>
            {categories.map(category => (
                <Grid item key={category.idCategory} >
                    <Box className="containerIcon" sx={{ 
                        textAlign: 'center', 
                        width: "100%",
                        // maxHeight: "100px",
                        borderRadius: '0 30px 0 30px',
                        color:'#646464',
                        fontSize: "16px",
                        p: 2,
                        m: 1,
                        transition: 'all 0.3s',
                        '&:hover': {
                            backgroundColor: '#fff',
                            boxShadow: "4px 4px 10px" ,
                        },
                    }}>
                        <Link component={RouterLink} to={`/products/category/${category.idCategory}`} underline="none" onClick={() => onCategoryClick(category.idCategory)} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img 
                                src={category.imageCategory} 
                                alt="" 
                                style={{ width: "100%", maxHeight: "100px", maxWidth: "140px"}} />
                            <Typography variant="subtitle1">{category.nameCategory}</Typography>
                        </Link>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};


