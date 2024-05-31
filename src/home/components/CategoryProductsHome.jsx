import { Typography, Box, Link } from "@mui/material";
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
        >
            {carouselItems.map((chunk, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {chunk.map(category => (
                        <Box key={category.idCategory} className="containerIcon" sx={{
                            textAlign: 'center',
                            width: "100%",
                            borderRadius: '0 30px 0 30px',
                            color: '#646464',
                            fontSize: "16px",
                            p: 2,
                            m: 1,
                            transition: 'all 0.3s',
                            '&:hover': {
                                backgroundColor: '#fff',
                                boxShadow: "4px 4px 10px",
                            },
                        }}>
                            <Link component={RouterLink} to={`/products/category/${category.idCategory}`} underline="none" onClick={() => onCategoryClick(category.idCategory)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img
                                    src={category.imageCategory}
                                    alt=""
                                    style={{ width: "100%", maxHeight: "100px", maxWidth: "140px" }} />
                                <Typography variant="subtitle1">{category.nameCategory}</Typography>
                            </Link>
                        </Box>
                    ))}
                </Box>
            ))}
        </Carousel>
    );
};
