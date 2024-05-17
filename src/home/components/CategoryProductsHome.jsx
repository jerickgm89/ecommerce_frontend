import { Typography, Grid, Box } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopIcon from '@mui/icons-material/Laptop';
import HvacIcon from '@mui/icons-material/Hvac';
import '../css';
import { useGetCategoriesQuery } from "../../store/api";

export const CategoryProductsHome = () => {
    const { data, error, isLoading } = useGetCategoriesQuery();

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
        <Grid container spacing={2} justifyContent={'center'}>
            <Grid item xs={12} sm={6} md={3} display={'flex'}>
                {data.map(category => (
                    <Box className="containerIcon" sx={{ 
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
                        {/* <img src={marca.logo} alt={marca.nameBrand} style={{ maxWidth: "100%", maxHeight: "100px" }} /> */}
                        <Typography variant="subtitle1">{category.nameCategory}</Typography>
                    </Box>
                ))}
            </Grid>
        </Grid>
    );
};