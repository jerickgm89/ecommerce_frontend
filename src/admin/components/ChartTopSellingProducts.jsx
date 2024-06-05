import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetTopSellingProductsQuery, useGetProductsQuery } from '../../store/api';
import { Box, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartTopSellingProducts = () => {
    const { data: topSellingProducts, error: topSellingProductsError, isLoading: topSellingProductsLoading } = useGetTopSellingProductsQuery();
    const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
  
    if (topSellingProductsLoading || productsLoading) return <Typography>Loading...</Typography>;
    if (topSellingProductsError || productsError) return <Typography>Error: {topSellingProductsError?.message || productsError?.message}</Typography>;
  
    const productNames = {};
    productsData.forEach(product => {
      productNames[product.idProduct] = product.nameProduct;
    });

    const shortenProductName = (name) => {
        if (name.length > 20) {
          return name.substring(0, 20) + '...';
        }
        return name;
    };

    const labels = topSellingProducts.map(item => shortenProductName(productNames[item.idProduct]) || `Producto ${item.idProduct}`);
    const totalSold = topSellingProducts.map(item => parseInt(item.totalSold));

    const randomColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    const backgroundColors = totalSold.map(() => randomColor());
  
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Total Vendido',
          data: totalSold,
          backgroundColor: backgroundColors.map(color => `${color}1)`),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Productos más Vendidos',
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Cantidad Vendida',
            },
          },
        },
      };
      
  
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          height: 400,
          margin: 'auto',
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Bar data={chartData} options={options} />
      </Box>
    );
  };
