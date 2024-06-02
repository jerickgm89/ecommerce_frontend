import { Grid, Box, Typography, Paper } from "@mui/material";
import { useGetBrandsQuery } from "../../store/api";
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

export const BrandsProductsHome = ({brandId}) => {
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
        <Carousel  
            // animation="slide"
            indicators={true} 
            interval={5000}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{          
                style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 50,
                    color: 'black',
                }
            }}
            
        >

            {carouselItems.map((chunk, index) => (
                <Grid container key={index} justifyContent="center" >
                    {chunk.map(marca => (
                        <Grid item xs={12} sm={6} md={2} key={marca.idBrand} sx={{ 
                            textAlign: 'center', 
                            // border: '4px solid #000',
                            borderRadius: '20px',
                            color: '#646464',
                            transition: 'background-color 0.5s',
                            '&:hover': {
                              backgroundColor: '#fff',
                            //   boxShadow: "4px 4px 10px"
                            },
                        }}>
                            <Box textAlign="center" p="5px"> 
                                {/* <Paper sx={{height:"60px", boxShadow:"0 3px 8px rgba(0, 0, 0, .24)", borderRadius: "0 30px", justifyContent: "center", alignItems:"center"}} > */}
                                <Link to={`/products/brand/${marca.idBrand}`}>
                                    
                                    <img 
                                        src={marca.logoBrand} 
                                        alt={marca.nameBrand} 
                                        style={{ width: 100, marginLeft: 10}} 
                                    />
                                </Link>
                                {/* <Typography variant="subtitle1">{marca.nameBrand}</Typography> */}
                                {/* </Paper> */}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Carousel>
    );
};
