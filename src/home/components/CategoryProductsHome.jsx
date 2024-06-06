import React from 'react';
import { Typography, Box, Link, Grid, CircularProgress } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useGetCategoriesQuery } from "../../store/api";
import Carousel from 'react-material-ui-carousel';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

export const CategoryProductsHome = ({ categoryId }) => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery({
        refetchOnMountOrArgChange: true});

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    const itemsPerSlide = {
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
    };

    const getCarouselItems = (categories, itemsPerSlide) => {
        const slides = [];
        let slide = [];

        categories.forEach((category, idx) => {
            slide.push(category);

            if (slide.length === itemsPerSlide) {
                slides.push(slide);
                slide = [];
            }
        });

        if (slide.length > 0) {
            slides.push(slide);
        }

        return slides;
    };

    const carouselItems = getCarouselItems(categories, itemsPerSlide.lg);

    // const onCategoryClick = (id) => {
    //     console.log(`Category clicked: ${id}`);
    // };

    return (
        <Box sx={{width: '100%'}}>
        <Carousel
            indicators={true}
            navButtonsAlwaysVisible={true}
            NextIcon={<KeyboardArrowRightOutlinedIcon sx={{ color: 'gray' }} />}
            PrevIcon={<KeyboardArrowLeftOutlinedIcon sx={{ color: 'gray' }} />}
            navButtonsProps={{
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 50,
                },
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '50px',
                },
            }}
            interval={5000}
        >
            {carouselItems.map((chunk, index) => (
                <Grid container spacing={2} key={index} justifyContent="center">
                    {chunk.map(category => (
                        <Grid
                            item
                            xs={6}
                            sm={6}
                            md={4}
                            lg={2}
                            key={category.idCategory}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Link
                                component={RouterLink}
                                to={`/products/category/${category.idCategory}`}
                                underline="none"
                                // onClick={() => onCategoryClick(category.idCategory)}
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                            >
                                <Box
                                    className="containerIcon"
                                    sx={{
                                        textAlign: 'center',
                                        borderRadius: '30px',
                                        color: '#646464',
                                        fontSize: "16px",
                                        p: 2,
                                        transition: 'all 0.3s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    <img
                                        src={category.imageCategory}
                                        alt=""
                                        style={{ width: "100%", maxHeight: "100px", objectFit: 'contain' }}
                                        loading="lazy"
                                    />
                                    <Typography variant="subtitle1">{category.nameCategory}</Typography>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Carousel>
        </Box>
    );
};
