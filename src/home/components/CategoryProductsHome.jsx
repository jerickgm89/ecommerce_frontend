import { Typography, Box, Link, Grid } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useGetCategoriesQuery } from "../../store/api";
import Carousel from 'react-material-ui-carousel';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

export const CategoryProductsHome = ({ onCategoryClick, categoryId }) => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    if (isLoading) return <Typography>Cargando...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    const itemsPerSlide = 4;  


    const carouselItems = categories.reduce((acc, category, idx) => {
        const chunkIndex = Math.floor(idx / itemsPerSlide);

        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }

        acc[chunkIndex].push(category);

        return acc;
    }, []);

    return (
        
        <Carousel
            // animation="slide"
            indicators={true}
            navButtonsAlwaysVisible={true}
            NextIcon={<KeyboardArrowRightOutlinedIcon sx={{ color: '#000' }} />}
            PrevIcon={<KeyboardArrowLeftOutlinedIcon sx={{ color: '#000' }} />}
            navButtonsProps={{
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',  
                    borderRadius: 50,   
                }
            }}
           
            indicatorContainerProps={{
                style: {
                    marginTop: '50px',
                }
            }}
            interval={5000}
        >
            {carouselItems.map((chunk, index) => (
                <Grid container spacing={2} key={index} justifyContent="center" >
                {chunk.map(category => (
                    <Grid item xs={6} sm={3}  key={category.idCategory} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link
                            component={RouterLink}
                            to={`/products/category/${category.idCategory}`}
                            underline="none"
                            onClick={() => onCategoryClick(category.idCategory)}
                            style={{ textDecoration: 'none', color: 'inherit', width: '100%'}}
                        >
                            <Box
                                className="containerIcon"
                                sx={{
                                    textAlign: 'center',
                                    borderRadius: '30px',
                                    color: '#646464',
                                    fontSize: "16px",
                                    p: 2,
                                    transition: 'all 0.5s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        boxShadow: "4px 4px 10px",
                                    },
                                }}
                            >
                                <img
                                    src={category.imageCategory}
                                    alt=""
                                    style={{ width: "100%", maxHeight: "100px", objectFit: 'contain' }}
                                />
                                <Typography variant="subtitle1">{category.nameCategory}</Typography>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            ))}
        </Carousel>
    );
};
