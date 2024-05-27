import { Typography, Grid, Box } from "@mui/material";
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import KitchenIcon from '@mui/icons-material/Kitchen';
// import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
// import SmartphoneIcon from '@mui/icons-material/Smartphone';
// import LaptopIcon from '@mui/icons-material/Laptop';
// import HvacIcon from '@mui/icons-material/Hvac';
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
                        // border: '4px solid #000',k
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
                        <img 
                            src={category.imageCategory} 
                            alt="" 
                            style={{ maxWidth: "100%", maxHeight: "100px"}} />
                        <Typography variant="subtitle1">{category.nameCategory}</Typography>
                    </Box>
                ))}
            </Grid>
        </Grid>
    );
};