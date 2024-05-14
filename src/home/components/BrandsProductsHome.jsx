import { Grid, Box, Typography } from "@mui/material";
import { useGetBrandsQuery } from "../../store/api";
import Carousel from 'react-material-ui-carousel';

export const BrandsProductsHome = () => {
    const { data, error, isLoading } = useGetBrandsQuery();

    if (isLoading) return <Typography>Cargando...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    if(!data) return null;

    const itemsPerSlide = 4;
    const carouselItems = data.reduce((acc, item, idx) => {
        const chunkIndex = Math.floor(idx / itemsPerSlide);

        if(!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }

        acc[chunkIndex].push(item);

        return acc;
    }, []);

    return (
        <Carousel>
            {carouselItems.map((chunk, index) => (
                <Grid container key={index} justifyContent="center">
                    {chunk.map(marca => (
                        <Grid item xs={12} sm={6} md={2} key={marca.id} sx={{ 
                            textAlign: 'center', 
                            border: '4px solid #000',
                            borderRadius: '20px',
                            p: 2,
                            m: 1,
                            transition: 'background-color 0.3s',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                            },
                        }}>
                            <Box textAlign="center">
                                {/* <img src={marca.logo} alt={marca.nameBrand} style={{ maxWidth: "100%", maxHeight: "100px" }} /> */}
                                <Typography variant="subtitle1">{marca.nameBrand}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Carousel>
    );
};
